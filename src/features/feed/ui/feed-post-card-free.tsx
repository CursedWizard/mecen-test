import { DsTypography, LikeActionButton, MessageCloudActionButton } from '@/components/design-system';
import { feedPostCardStyles } from '@/features/feed/styles';
import type { FeedPostCardProps } from '@/features/feed/types';
import { descriptionSource, shouldOfferReadMore } from '@/features/feed/utils';
import { postDetailQueryKey } from '@/queries/post-detail';
import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

export const FeedPostCardFree = observer(({ post, onLikePress, onCommentsPress, variant = 'feed', style }: FeedPostCardProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [descriptionExpanded, setDescriptionExpanded] = React.useState(false);
  const previewOrShort = descriptionSource(post);
  const fullBody = post.body?.trim() ?? '';
  const isDetail = variant === 'detail';
  const displayDescription = isDetail
    ? fullBody || previewOrShort
    : descriptionExpanded
      ? fullBody || previewOrShort
      : previewOrShort;
  const canReadMore = shouldOfferReadMore(post);
  const showReadMoreLink = !isDetail && canReadMore && !descriptionExpanded;

  const openDetail = React.useCallback(() => {
    queryClient.setQueryData(postDetailQueryKey(post.id), post);
    router.push(`/feed/${post.id}`);
  }, [post, post.id, queryClient, router]);

  React.useEffect(() => {
    setDescriptionExpanded(false);
  }, [post.id]);

  const onLike = React.useCallback(() => {
    if (onLikePress) onLikePress(post.id);
  }, [onLikePress, post.id]);

  return (
    <View style={[feedPostCardStyles.card, style]}>
      <Pressable
        accessibilityRole="button"
        onPress={isDetail ? undefined : openDetail}
        disabled={isDetail}
        style={({ pressed }) =>
          !isDetail && pressed ? feedPostCardStyles.cardPressed : undefined
        }>
        <View style={feedPostCardStyles.header}>
          <Image source={{ uri: post.author.avatarUrl }} style={feedPostCardStyles.avatar} contentFit="cover" />
          <DsTypography variant="label" style={feedPostCardStyles.displayName} numberOfLines={1}>
            {post.author.displayName}
          </DsTypography>
        </View>

        <View style={feedPostCardStyles.coverWrap}>
          <Image source={{ uri: post.coverUrl }} style={feedPostCardStyles.coverImage} contentFit="cover" />
        </View>
      </Pressable>

      <View style={feedPostCardStyles.textBlock}>
        <Pressable
          accessibilityRole="button"
          onPress={isDetail ? undefined : openDetail}
          disabled={isDetail}
          style={({ pressed }) =>
            !isDetail && pressed ? feedPostCardStyles.cardPressed : undefined
          }>
          <DsTypography variant="headline" style={feedPostCardStyles.title} numberOfLines={2}>
            {post.title}
          </DsTypography>
        </Pressable>

        {displayDescription.length > 0 ? (
          <DsTypography variant="body">
            {displayDescription}
            {showReadMoreLink ? (
              <>
                {' '}
                <Text style={feedPostCardStyles.readMoreLink} onPress={() => setDescriptionExpanded(true)}>
                  Показать еще
                </Text>
              </>
            ) : null}
          </DsTypography>
        ) : null}
      </View>

      <View style={feedPostCardStyles.metrics}>
        <LikeActionButton variant={post.isLiked ? 'active' : 'default'} onPress={onLike} style={feedPostCardStyles.likeButton}>
          {String(post.likesCount)}
        </LikeActionButton>
        <MessageCloudActionButton
          mode={'main'}
          variant="default"
          onPress={isDetail ? onCommentsPress : openDetail}>
          {String(post.commentsCount)}
        </MessageCloudActionButton>
      </View>
    </View>
  );
});
