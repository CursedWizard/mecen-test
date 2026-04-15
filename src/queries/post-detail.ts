import { createPostComment, fetchCommentsPage } from '@/lib/api/comments';
import { fetchPostById } from '@/lib/api/posts';
import type { CommentsPage } from '@/lib/api/types';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const postDetailQueryKey = (postId: string) => ['posts', 'detail', postId] as const;

export const postCommentsInfiniteQueryKey = (postId: string) => ['posts', postId, 'comments', 'infinite'] as const;

/** Matches `FEED_QUERY_KEY` in `queries/feed.ts` (avoid importing feed → circular dependency). */
const FEED_INFINITE_QUERY_KEY = ['posts', 'feed'] as const;

const COMMENTS_PAGE_SIZE = 20;

export function usePostDetailQuery(postId: string | undefined) {
  return useQuery({
    queryKey: postId ? postDetailQueryKey(postId) : ['posts', 'detail', ''],
    queryFn: async () => {
      if (!postId) throw new Error('missing_post_id');
      return fetchPostById(postId);
    },
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
      void queryClient.invalidateQueries({ queryKey: postCommentsInfiniteQueryKey(postId) });
      void queryClient.invalidateQueries({ queryKey: postDetailQueryKey(postId) });
      void queryClient.invalidateQueries({ queryKey: FEED_INFINITE_QUERY_KEY });
    },
  });
}
