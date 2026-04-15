import { AnimatedSkeleton } from '@/components/animated-skeleton/ui';
import { feedPostCardSkeletonStyles, feedPostCardStyles } from '@/features/feed/styles';
import * as React from 'react';
import { View } from 'react-native';

export function FeedPostCardSkeleton() {
  return (
    <View style={feedPostCardStyles.card}>
      <View style={feedPostCardStyles.header}>
        <AnimatedSkeleton light style={feedPostCardStyles.avatar} />
        <AnimatedSkeleton light style={feedPostCardSkeletonStyles.nameBar} />
      </View>

      <AnimatedSkeleton light style={feedPostCardStyles.coverWrap} />

      <View style={feedPostCardStyles.textBlock}>
        <AnimatedSkeleton light style={feedPostCardSkeletonStyles.titleLine} />
        <AnimatedSkeleton light style={feedPostCardSkeletonStyles.bodyLine} />
      </View>

      <View style={feedPostCardStyles.metrics}>
        <AnimatedSkeleton
          light
          style={[feedPostCardStyles.likeButton, feedPostCardSkeletonStyles.likeActionSkeleton]}
        />
        <AnimatedSkeleton light style={feedPostCardSkeletonStyles.commentsActionSkeleton} />
      </View>
    </View>
  );
}
