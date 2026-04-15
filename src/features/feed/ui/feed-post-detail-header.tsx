import { DsButtonLink, DsTypography } from '@/components/design-system';
import { feedPostDetailStyles } from '@/features/feed/styles';
import type { FeedPostDetailHeaderProps } from '@/features/feed/types';
import { FeedPostCard } from '@/features/feed/ui/feed-post-card';
import { formatCommentsCountLabelRu } from '@/utils/feed-detail-helper';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { View } from 'react-native';

export const FeedPostDetailHeader = observer(({ post, onLikePress, onCommentsPress }: FeedPostDetailHeaderProps) => {
  const noopSort = React.useCallback(() => {}, []);

  return (
    <View>
      <FeedPostCard style={feedPostDetailStyles.postCard} post={post} variant="detail" onLikePress={onLikePress} onCommentsPress={onCommentsPress} />
      <View style={feedPostDetailStyles.commentsMetaRow}>
        <DsTypography variant="label" style={feedPostDetailStyles.commentsMetaCount}>
          {formatCommentsCountLabelRu(post.commentsCount)}
        </DsTypography>
        <DsButtonLink onPress={noopSort}>Сначала новые</DsButtonLink>
      </View>
    </View>
  );
});
