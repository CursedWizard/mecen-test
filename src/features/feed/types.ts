import type { RefObject } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';

import type { Comment, Post, PostTier } from '@/lib/api/types';

export type FeedTierTabKey = 'all' | PostTier;

export type FeedPostCardVariant = 'feed' | 'detail';

export type FeedPostCardProps = {
  post: Post;
  onLikePress?: (postId: string) => void;
  /** Detail only: tap comment count to focus the screen composer. */
  onCommentsPress?: () => void;
  /** On detail screen: full description, no navigation to self. */
  variant?: FeedPostCardVariant;
  style?: StyleProp<ViewStyle>;
};

export type FeedPostDetailHeaderProps = {
  post: Post;
  onLikePress: (postId: string) => void;
  onCommentsPress?: () => void;
};

export type FeedCommentRowProps = {
  comment: Comment;
};

export type PaidTierCoverOverlayProps = {
  /** Android: ref to the `BlurTargetView` that wraps the cover image. */
  blurTarget: RefObject<View | null>;
  onDonatePress: () => void;
};
