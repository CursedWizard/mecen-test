import { apiGet, apiPost } from './client';
import type { ApiLikeResponse, ApiPostDetailResponse, ApiPostsResponse, LikeResponseData, Post } from './types';

export type GetPostsParams = {
  limit?: number;
  cursor?: string;
  tier?: 'free' | 'paid';
};

export async function fetchPostsPage(params: GetPostsParams = {}): Promise<ApiPostsResponse> {
  const { limit = 15, cursor, tier } = params;
  const search = new URLSearchParams();
  search.set('limit', String(Math.min(Math.max(limit, 1), 20)));
  if (cursor) search.set('cursor', cursor);
  if (tier) search.set('tier', tier);

  const q = search.toString();
  return apiGet<ApiPostsResponse>(`/posts?${q}`);
}

export async function fetchPostById(postId: string): Promise<Post> {
  const json = await apiGet<ApiPostDetailResponse>(`/posts/${encodeURIComponent(postId)}`);
  if (!json.ok || json.data?.post == null) {
    throw new Error('bad_response');
  }
  return json.data.post;
}

export async function likePost(postId: string): Promise<LikeResponseData> {
  const res = await apiPost<ApiLikeResponse>(`/posts/${postId}/like`);
  if (!res.ok || res.data == null) {
    throw new Error('bad_response');
  }
  return res.data;
}
