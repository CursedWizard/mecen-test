import { createPostComment, fetchCommentsPage } from '@/lib/api/comments';
import { fetchPostById } from '@/lib/api/posts';
import type { Comment, CommentsPage } from '@/lib/api/types';
import type { InfiniteData, QueryClient } from '@tanstack/react-query';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const postDetailQueryKey = (postId: string) => ['posts', 'detail', postId] as const;

export const postCommentsInfiniteQueryKey = (postId: string) => ['posts', postId, 'comments', 'infinite'] as const;

/** Matches `FEED_QUERY_KEY_PREFIX` in `queries/feed.ts` (avoid importing feed → circular dependency). */
const FEED_INFINITE_QUERY_KEY_PREFIX = ['posts', 'feed'] as const;

const COMMENTS_PAGE_SIZE = 20;

export function usePostDetailQuery(postId: string | undefined) {
  return useQuery({
    queryKey: postId ? postDetailQueryKey(postId) : ['posts', 'detail', ''],
    queryFn: async () => {
      if (!postId) throw new Error('missing_post_id');
      return fetchPostById(postId);
    },
    staleTime: 60_000,
    enabled: Boolean(postId),
  });
}

export function usePostCommentsInfiniteQuery(postId: string | undefined) {
  return useInfiniteQuery({
    queryKey: postId ? postCommentsInfiniteQueryKey(postId) : ['posts', '', 'comments', 'infinite'],
    initialPageParam: undefined as string | undefined,
    queryFn: async ({ pageParam }): Promise<CommentsPage> => {
      if (!postId) throw new Error('missing_post_id');
      return fetchCommentsPage(postId, { cursor: pageParam, limit: COMMENTS_PAGE_SIZE });
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasMore && lastPage.nextCursor ? lastPage.nextCursor : undefined,
    enabled: Boolean(postId),
    staleTime: 60_000,
  });
}

/**
 * When the comments infinite query has no further pages (`hasNextPage` is false), appends the
 * realtime comment to the last loaded page. Skips if the comment id is already present.
 */
export function appendPostCommentFromRealtimeIfAllPagesLoaded(
  queryClient: QueryClient,
  postId: string,
  comment: Comment,
): void {
  const key = postCommentsInfiniteQueryKey(postId);
  queryClient.setQueryData<InfiniteData<CommentsPage>>(key, (old) => {
    if (!old?.pages.length) return old;
    const lastPage = old.pages[old.pages.length - 1];
    if (lastPage.hasMore) return old;
    const alreadyThere = old.pages.some((p) => p.comments.some((c) => c.id === comment.id));
    if (alreadyThere) return old;
    const lastIndex = old.pages.length - 1;
    const pages = old.pages.map((page, i) =>
      i === lastIndex ? { ...page, comments: [...page.comments, comment] } : page,
    );
    return { ...old, pages };
  });
}

type AddPostCommentVariables = {
  postId: string;
  text: string;
};

export function useAddPostCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, text }: AddPostCommentVariables) => createPostComment(postId, text),
    onSuccess: (_data, { postId }) => {
      // void queryClient.invalidateQueries({ queryKey: postCommentsInfiniteQueryKey(postId) });
      // void queryClient.invalidateQueries({ queryKey: postDetailQueryKey(postId) });
      // void queryClient.invalidateQueries({ queryKey: [...FEED_INFINITE_QUERY_KEY_PREFIX] });
    },
  });
}
