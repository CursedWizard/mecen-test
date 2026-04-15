import { DsSkeleton, DsTypography } from '@/components/design-system';
import { feedPostCardStyles } from '@/features/feed/styles';
import type { FeedPostCardProps } from '@/features/feed/types';
import { PaidTierCoverOverlay } from '@/features/feed/ui/paid-tier-cover-overlay';
import { BlurTargetView } from 'expo-blur';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Pressable, View } from 'react-native';

export const FeedPostCardPaid = observer(({ post }: FeedPostCardProps) => {
  const router = useRouter();
  const paidCoverBlurTargetRef = React.useRef<View | null>(null);

  const donatePress = React.useCallback(() => {
    // TODO: Implement donate press
  }, [post.id, router]);

  return (
    <View style={feedPostCardStyles.card}>
      <Pressable
        accessibilityRole="button"
        onPress={donatePress}
      >
        <View style={feedPostCardStyles.header}>
          <Image source={{ uri: post.author.avatarUrl }} style={feedPostCardStyles.avatar} contentFit="cover" />
          <DsTypography variant="label" style={feedPostCardStyles.displayName} numberOfLines={1}>
            {post.author.displayName}
          </DsTypography>
        </View>

        <View style={feedPostCardStyles.coverWrap}>
          <BlurTargetView ref={paidCoverBlurTargetRef} style={feedPostCardStyles.coverBlurTarget}>
            <Image source={{ uri: post.coverUrl }} style={feedPostCardStyles.coverImage} contentFit="cover" />
          </BlurTargetView>
          <PaidTierCoverOverlay blurTarget={paidCoverBlurTargetRef} onDonatePress={donatePress} />
        </View>
      </Pressable>

      <View style={feedPostCardStyles.paidSkeletonBlock}>
        <DsSkeleton width={164} height={26} />
        <DsSkeleton width="100%" height={40} />
      </View>
    </View>
  );
});
