import { fetchPostsPage, likePost } from '@/lib/api/posts';
import type { Post, PostsPage } from '@/lib/api/types';
import { postDetailQueryKey } from '@/queries/post-detail';
import type { InfiniteData } from '@tanstack/react-query';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const FEED_QUERY_KEY = ['posts', 'feed'] as const;

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

export function useFeedInfiniteQuery() {
  return useInfiniteQuery({
    queryKey: FEED_QUERY_KEY,
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }) => {
      const res = await fetchPostsPage({ cursor: pageParam, limit: PAGE_SIZE });
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
      await queryClient.cancelQueries({ queryKey: FEED_QUERY_KEY });
      await queryClient.cancelQueries({ queryKey: postDetailQueryKey(postId) });
      const previous = queryClient.getQueryData<InfiniteData<PostsPage>>(FEED_QUERY_KEY);
      const previousDetail = queryClient.getQueryData<Post>(postDetailQueryKey(postId));
      queryClient.setQueryData<InfiniteData<PostsPage>>(FEED_QUERY_KEY, (old) =>
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
      return { previous, previousDetail };
    },
    onError: (_err, postId, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(FEED_QUERY_KEY, context.previous);
      }
      if (context?.previousDetail !== undefined) {
        queryClient.setQueryData(postDetailQueryKey(postId), context.previousDetail);
      }
    },
    onSuccess: (data, postId) => {
      queryClient.setQueryData<InfiniteData<PostsPage>>(FEED_QUERY_KEY, (old) =>
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
