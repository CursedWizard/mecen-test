import { apiGet, apiPost } from './client';
import type { ApiCommentCreatedResponse, ApiCommentsResponse, Comment, CommentsPage } from './types';

export type GetCommentsParams = {
  limit?: number;
  cursor?: string;
};

export async function fetchCommentsPage(postId: string, params: GetCommentsParams = {}): Promise<CommentsPage> {
  const { limit = 20, cursor } = params;
  const search = new URLSearchParams();
  search.set('limit', String(Math.min(Math.max(limit, 1), 20)));
  if (cursor) search.set('cursor', cursor);

  const q = search.toString();
  const json = await apiGet<ApiCommentsResponse>(`/posts/${encodeURIComponent(postId)}/comments?${q}`);
  if (!json.ok || json.data == null) {
    throw new Error('bad_response');
  }
  return json.data;
}

export async function createPostComment(postId: string, text: string): Promise<Comment> {
  const json = await apiPost<ApiCommentCreatedResponse>(`/posts/${encodeURIComponent(postId)}/comments`, { text });
  if (!json.ok || json.data?.comment == null) {
    throw new Error('bad_response');
  }
  return json.data.comment;
}
