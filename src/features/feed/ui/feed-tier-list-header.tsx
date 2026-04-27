import { DsTab } from '@/components/design-system';
import { feedTierListHeaderStyles } from '@/features/feed/styles';
import type { FeedTierTabKey } from '@/features/feed/types';
import {
  FEED_TIER_TAB_ITEMS,
  feedTierFilterFromTabKey,
  feedTierTabKeyFromFilter,
} from '@/features/feed/utils';
import { feedStore } from '@/store/feed-store';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { View } from 'react-native';

export const FeedTierListHeader = observer(() => {
  const [currentKey, setCurrentKey] = React.useState<FeedTierTabKey>(feedTierTabKeyFromFilter(feedStore.tierFilter));

  const onSelect = React.useCallback((key: string) => {
    setCurrentKey(key as FeedTierTabKey);
    feedStore.setIsFeedLoading(true);
  }, []);

  const onAnimationEnd = React.useCallback((key?: string) => {
    /* Wait for animation to end, otherwise screen will freeze for a moment */
    feedStore.setTierFilter(feedTierFilterFromTabKey(key as FeedTierTabKey));
    /* This way we hide loading indicator when list finished rendering */
    feedStore.setIsFeedLoading(false);
  }, []);

  return (
    <View style={feedTierListHeaderStyles.root}>
      <DsTab items={FEED_TIER_TAB_ITEMS} selectedKey={currentKey} onSelect={onSelect} onAnimationEnd={onAnimationEnd} />
    </View>
  );
});
