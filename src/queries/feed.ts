import { fetchPostsPage, likePost } from '@/lib/api/posts';
import type { FeedTierFilter, Post, PostsPage } from '@/lib/api/types';
import { postDetailQueryKey } from '@/queries/post-detail';
import type { InfiniteData, QueryClient, QueryKey } from '@tanstack/react-query';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/** Prefix for all feed infinite queries (`['posts', 'feed', tierSegment]`). */
export const FEED_QUERY_KEY_PREFIX = ['posts', 'feed'] as const;

export function feedInfiniteQueryKey(tierFilter: FeedTierFilter) {
  return [...FEED_QUERY_KEY_PREFIX, tierFilter ?? 'all'] as const;
}

const PAGE_SIZE = 15;

function patchPostInFeedCache(
  old: InfiniteData<PostsPage> | undefined,
  postId: string,
  patch: (post: Post) => Post,
): InfiniteData<PostsPage> | undefined {
  if (!old) return old;
  return {
    pageParams: old.pageParams,
    pages: old.pages.map((page) => {
      const postInPage = page.posts.find((p) => p.id === postId);
      if (!postInPage) return page;
      const patchedPost = patch(postInPage);
      return {
        ...page,
        posts: page.posts.map((p) => (p.id === postId ? patchedPost : p)),
      };
    }),
  };
}

function setAllFeedInfiniteCaches(
  queryClient: QueryClient,
  updater: (old: InfiniteData<PostsPage> | undefined) => InfiniteData<PostsPage> | undefined,
): void {
  queryClient.setQueriesData<InfiniteData<PostsPage>>(
    { queryKey: [...FEED_QUERY_KEY_PREFIX] },
    updater,
  );
}

/** Applies server `likesCount` from realtime (does not change `isLiked`). */
export function updatePostLikesCountInCaches(
  queryClient: QueryClient,
  postId: string,
  likesCount: number,
): void {
  setAllFeedInfiniteCaches(queryClient, (old) =>
    patchPostInFeedCache(old, postId, (p) => ({ ...p, likesCount })),
  );
  queryClient.setQueryData<Post | undefined>(postDetailQueryKey(postId), (old) =>
    old ? { ...old, likesCount } : old,
  );
}

/** Increments `commentsCount` on the post in feed and post-detail caches (e.g. realtime `comment_added`). */
export function incrementPostCommentsCountInCaches(queryClient: QueryClient, postId: string): void {
  setAllFeedInfiniteCaches(queryClient, (old) =>
    patchPostInFeedCache(old, postId, (p) => ({ ...p, commentsCount: Math.max(0, p.commentsCount + 1) })),
  );
  queryClient.setQueryData<Post | undefined>(postDetailQueryKey(postId), (old) =>
    old ? { ...old, commentsCount: Math.max(0, old.commentsCount + 1) } : old,
  );
}

export function useFeedInfiniteQuery(tierFilter: FeedTierFilter) {
  return useInfiniteQuery({
    queryKey: feedInfiniteQueryKey(tierFilter),
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      const res = await fetchPostsPage({
        cursor: pageParam,
        limit: PAGE_SIZE,
        tier: tierFilter,
      });
      if (!res.ok) {
        throw new Error('bad_response');
      }
      return res.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore && lastPage.nextCursor ? lastPage.nextCursor : undefined,
  });
}

export function useLikePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: [...FEED_QUERY_KEY_PREFIX] });
      await queryClient.cancelQueries({ queryKey: postDetailQueryKey(postId) });
      const previousFeedEntries = queryClient.getQueriesData<InfiniteData<PostsPage>>({
        queryKey: [...FEED_QUERY_KEY_PREFIX],
      });
      const previousDetail = queryClient.getQueryData<Post>(postDetailQueryKey(postId));
      setAllFeedInfiniteCaches(queryClient, (old) =>
        patchPostInFeedCache(old, postId, (p) => {
          const wasLiked = p.isLiked ?? false;
          return {
            ...p,
            isLiked: !wasLiked,
            likesCount: Math.max(0, wasLiked ? p.likesCount - 1 : p.likesCount + 1),
          };
        }),
      );
      queryClient.setQueryData<Post | undefined>(postDetailQueryKey(postId), (old) => {
        if (!old) return old;
        const wasLiked = old.isLiked ?? false;
        return {
          ...old,
          isLiked: !wasLiked,
          likesCount: Math.max(0, wasLiked ? old.likesCount - 1 : old.likesCount + 1),
        };
      });
      return { previousFeedEntries, previousDetail };
    },
    onError: (_err, postId, context) => {
      context?.previousFeedEntries?.forEach(([key, data]) => {
        queryClient.setQueryData(key as QueryKey, data);
      });
      if (context?.previousDetail !== undefined) {
        queryClient.setQueryData(postDetailQueryKey(postId), context.previousDetail);
      }
    },
    onSuccess: (data, postId) => {
      setAllFeedInfiniteCaches(queryClient, (old) =>
        patchPostInFeedCache(old, postId, (p) => ({
          ...p,
          isLiked: data.isLiked,
          likesCount: data.likesCount,
        })),
      );
      queryClient.setQueryData<Post | undefined>(postDetailQueryKey(postId), (old) =>
        old ? { ...old, isLiked: data.isLiked, likesCount: data.likesCount } : old,
      );
    },
  });
}
