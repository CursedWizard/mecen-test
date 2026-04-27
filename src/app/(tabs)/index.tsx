import { DsTypography } from '@/components/design-system';
import { EmptyRequestResult } from '@/components/error-placeholder/ui';
import { ColorPalette, Spacing } from '@/constants/theme';
import { FeedPostCard } from '@/features/feed/ui/feed-post-card';
import { FeedPostCardSkeleton } from '@/features/feed/ui/feed-post-card-skeleton';
import { FeedTierListHeader } from '@/features/feed/ui/feed-tier-list-header';
import type { Post } from '@/lib/api/types';
import { useFeedInfiniteQuery, useLikePostMutation } from '@/queries/feed';
import { feedStore } from '@/store/feed-store';
import { router } from 'expo-router';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FEED_SKELETON_KEYS = ['feed-skeleton-0', 'feed-skeleton-1', 'feed-skeleton-2'] as const;

function FeedScreen() {
  const insets = useSafeAreaInsets();
  const { mutate: likePost } = useLikePostMutation();

  const onLikePress = React.useCallback(
    (postId: string) => {
      likePost(postId);
    },
    [likePost],
  );

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isRefetching, refetch } =
    useFeedInfiniteQuery(feedStore.tierFilter);

  const posts = React.useMemo(() => data?.pages.flatMap((p) => p.posts) ?? [], [data?.pages]);

  const onEndReached = React.useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const renderItem: ListRenderItem<Post> = React.useCallback(
    ({ item }) => <FeedPostCard post={item} onLikePress={onLikePress} />,
    [onLikePress],
  );

  const footer = React.useMemo(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator color={ColorPalette.PrimaryButtonBackgroundMain} />
      </View>
    );
  }, [isFetchingNextPage]);

  const onGoHomeFromError = React.useCallback(() => {
    router.replace('/(tabs)');
  }, []);

  if (isPending) {
    return (
      <View style={styles.root}>
        <FlatList
          data={FEED_SKELETON_KEYS}
          keyExtractor={(id) => id}
          renderItem={() => <FeedPostCardSkeleton />}
          ListHeaderComponent={<FeedTierListHeader />}
          contentContainerStyle={styles.listContent}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorFallbackShell, { paddingTop: insets.top }]}>
        <EmptyRequestResult message="Не удалось загрузить публикации" onGoHome={onGoHomeFromError} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={<FeedTierListHeader />}
        ListFooterComponent={footer}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={isRefetching || feedStore.isFeedLoading} onRefresh={() => void refetch()} colors={[ColorPalette.PrimaryButtonBackgroundMain]} />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.35}
        ListEmptyComponent={
          <View style={styles.empty}>
            <DsTypography variant="body" style={styles.emptyText}>
              Пока нет публикаций
            </DsTypography>
          </View>
        }
      />
    </View>
  );
}

export default observer(FeedScreen);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing.large,
  },
  listHeader: {
    paddingHorizontal: Spacing.medium,
    paddingBottom: Spacing.small,
  },
  screenTitle: {
    color: ColorPalette.AppTextLight,
  },
  footer: {
    paddingVertical: Spacing.medium,
    alignItems: 'center',
  },
  errorFallbackShell: {
    flex: 1,
  },
  empty: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    color: ColorPalette.AppTextLight,
  },
});
