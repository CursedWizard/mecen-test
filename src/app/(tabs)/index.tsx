import { DsTypography } from '@/components/design-system';
import { EmptyRequestResult } from '@/components/error-placeholder/ui';
import { ColorPalette, Spacing } from '@/constants/theme';
import { FeedPostCard } from '@/features/feed/ui/feed-post-card';
import type { Post } from '@/lib/api/types';
import { useFeedInfiniteQuery, useLikePostMutation } from '@/queries/feed';
import { router } from 'expo-router';
import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const { mutate: likePost } = useLikePostMutation();

  const onLikePress = React.useCallback(
    (postId: string) => {
      likePost(postId);
    },
    [likePost],
  );

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isRefetching, refetch } =
    useFeedInfiniteQuery();

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

  if (isPending) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={ColorPalette.PrimaryButtonBackgroundMain} />
        <DsTypography variant="caption" style={styles.hint}>
          Загрузка…
        </DsTypography>
      </View>
    );
  }

  const onGoHomeFromError = React.useCallback(() => {
    router.replace('/(tabs)');
  }, []);

  if (error) {
    return (
      <View style={[styles.errorFallbackShell, { paddingTop: insets.top }]}>
        <EmptyRequestResult message="Не удалось загрузить публикации" onGoHome={onGoHomeFromError} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListFooterComponent={footer}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={() => void refetch()} colors={[ColorPalette.PrimaryButtonBackgroundMain]} />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: ColorPalette.TabBarTrackBackground,
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
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.mediumSmall,
    backgroundColor: ColorPalette.TabBarTrackBackground,
  },
  hint: {
    color: ColorPalette.ActionDefaultTextMain,
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
