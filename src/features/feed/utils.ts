import type { FeedTierTabKey } from '@/features/feed/types';
import type { FeedTierFilter, Post } from '@/lib/api/types';

export const FEED_TIER_TAB_ITEMS: { key: FeedTierTabKey; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'free', label: 'Бесплатные' },
  { key: 'paid', label: 'Платные' },
];

export function feedTierTabKeyFromFilter(filter: FeedTierFilter): FeedTierTabKey {
  if (filter === undefined) return 'all';
  return filter;
}

export function feedTierFilterFromTabKey(key: FeedTierTabKey): FeedTierFilter {
  if (key === 'all') return undefined;
  return key;
}

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
