import type { FeedPostCardProps } from '@/features/feed/types';
import { FeedPostCardFree } from '@/features/feed/ui/feed-post-card-free';
import { FeedPostCardPaid } from '@/features/feed/ui/feed-post-card-paid';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

export const FeedPostCard = observer((props: FeedPostCardProps) => {
  return props.post.tier === 'paid' ? <FeedPostCardPaid {...props} /> : <FeedPostCardFree {...props} />;
});
