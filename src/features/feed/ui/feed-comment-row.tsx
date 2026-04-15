import { DsTypography, LikeActionButtonPressable } from '@/components/design-system';
import { feedPostDetailStyles } from '@/features/feed/styles';
import type { FeedCommentRowProps } from '@/features/feed/types';
import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { View } from 'react-native';

export const FeedCommentRow = observer(({ comment }: FeedCommentRowProps) => {
  const [likeCount, setLikeCount] = React.useState(0);
  const noopLike = React.useCallback(() => {}, []);

  const handleLikePress = React.useCallback(() => {
    if (likeCount > 0) {
      setLikeCount(0);
      return;
    }
    setLikeCount(1);
  }, [likeCount]);

  return (
    <View style={feedPostDetailStyles.commentRow}>
      <Image source={{ uri: comment.author.avatarUrl }} style={feedPostDetailStyles.commentAvatar} contentFit="cover" />
      <View style={feedPostDetailStyles.commentTextColumn}>
        <DsTypography variant="label" style={feedPostDetailStyles.commentAuthorName} numberOfLines={2}>
          {comment.author.displayName}
        </DsTypography>
        <DsTypography variant="caption" style={feedPostDetailStyles.commentBody}>
          {comment.text}
        </DsTypography>
      </View>
      <LikeActionButtonPressable variant={likeCount > 0 ? 'active' : 'default'} onPress={handleLikePress} style={feedPostDetailStyles.commentLikeButton}>
        {likeCount}
      </LikeActionButtonPressable>
    </View>
  );
});
