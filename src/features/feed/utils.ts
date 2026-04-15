import type { Post } from '@/lib/api/types';

export function descriptionSource(post: Post): string {
  if (post.preview?.trim()) return post.preview.trim();
  return post.body?.trim() ?? '';
}

export function shouldOfferReadMore(post: Post): boolean {
  if (post.tier === 'paid') return true;
  const body = post.body?.trim() ?? '';
  if (!body) return false;
  const preview = post.preview?.trim() ?? '';
  if (!preview) return body.length > 0;
  return body.length > preview.length || body !== preview;
}
