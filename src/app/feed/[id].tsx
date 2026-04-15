import { DsTypography } from '@/components/design-system';
import { EmptyRequestResult } from '@/components/error-placeholder/ui';
import { DsSendMessage } from '@/components/send-message/ui';
import { ColorPalette, Spacing } from '@/constants/theme';
import { FeedCommentRow } from '@/features/feed/ui/feed-comment-row';
import { FeedPostDetailHeader } from '@/features/feed/ui/feed-post-detail-header';
import { useGetKeyboardHeight } from '@/hooks/use-keyboard-height';
import { ApiError } from '@/lib/api/client';
import type { Comment } from '@/lib/api/types';
import { useLikePostMutation } from '@/queries/feed';
import { useAddPostCommentMutation, usePostCommentsInfiniteQuery, usePostDetailQuery } from '@/queries/post-detail';
import { router, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  RefreshControl,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FeedPostDetailScreen() {
  const insets = useSafeAreaInsets();
  const rawId = useLocalSearchParams<{ id: string | string[] }>().id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const [composerText, setComposerText] = React.useState('');
  const composerInputRef = React.useRef<TextInput>(null);

  const { data: post, error: postError, isPending: isPostPending, isRefetching: isPostRefetching, refetch: refetchPost } =
    usePostDetailQuery(id);
  const {
    data: commentsData,
    error: commentsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isCommentsPending,
    isRefetching: isCommentsRefetching,
    refetch: refetchComments,
  } = usePostCommentsInfiniteQuery(id);
  const { keyboardHeight, hideKeyboard } = useGetKeyboardHeight(Platform.select({ ios: -insets.bottom, default: 12 }));

  const { mutate: addComment, isPending: isAddingComment } = useAddPostCommentMutation();

  const { mutate: likePost } = useLikePostMutation();

  const onLikePress = React.useCallback(
    (postId: string) => {
      likePost(postId);
    },
    [likePost],
  );

  const comments = React.useMemo(() => commentsData?.pages.flatMap((p) => p.comments) ?? [], [commentsData?.pages]);

  const onEndReached = React.useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const renderItem: ListRenderItem<Comment> = React.useCallback(({ item }) => <FeedCommentRow comment={item} />, []);

  const focusCommentComposer = React.useCallback(() => {
    composerInputRef.current?.focus();
  }, []);

  const listHeader = React.useMemo(() => {
    if (!post) return null;
    return (
      <FeedPostDetailHeader post={post} onLikePress={onLikePress} onCommentsPress={focusCommentComposer} />
    );
  }, [post, onLikePress, focusCommentComposer]);

  const footer = React.useMemo(() => {
    if (!isFetchingNextPage) {
      return <View style={styles.footerEmpty}></View>;
    }
    return (
      <View style={styles.footer}>
        <ActivityIndicator color={ColorPalette.PrimaryButtonBackgroundMain} />
      </View>
    );
  }, [isFetchingNextPage]);

  const onRefresh = React.useCallback(() => {
    void Promise.all([refetchPost(), refetchComments()]);
  }, [refetchPost, refetchComments]);

  const refreshing = isPostRefetching || isCommentsRefetching;

  const onGoHomeFromError = React.useCallback(() => {
    router.replace('/(tabs)');
  }, []);

  const listEmpty = React.useMemo(() => {
    if (commentsError) {
      return (
        <View style={styles.emptyComments}>
          <DsTypography variant="body" style={styles.emptyCommentsText}>
            Не удалось загрузить комментарии
          </DsTypography>
        </View>
      );
    }
    if (isCommentsPending && comments.length === 0) {
      return (
        <View style={styles.emptyComments}>
          <ActivityIndicator color={ColorPalette.PrimaryButtonBackgroundMain} />
        </View>
      );
    }
    if (comments.length === 0) {
      return (
        <View style={styles.emptyComments}>
          <DsTypography variant="body" style={styles.emptyCommentsText}>
            Пока нет комментариев
          </DsTypography>
        </View>
      );
    }
    return null;
  }, [comments.length, commentsError, isCommentsPending]);

  if (!id) {
    return (
      <View style={styles.flex}>
        <View style={styles.centered}>
          <DsTypography variant="body" style={styles.hint}>
            Не указан пост
          </DsTypography>
        </View>
      </View>
    );
  }

  if (isPostPending) {
    return (
      <View style={styles.flex}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={ColorPalette.PrimaryButtonBackgroundMain} />
          <DsTypography variant="caption" style={styles.hint}>
            Загрузка…
          </DsTypography>
        </View>
      </View>
    );
  }

  if (postError || !post) {
    const is404 = postError instanceof ApiError && postError.status === 404;
    return (
      <View style={styles.flex}>
        <EmptyRequestResult
          message={is404 ? 'Публикация не найдена' : 'Не удалось загрузить публикацию'}
          onGoHome={onGoHomeFromError}
        />
      </View>
    );
  }

  const onSendComment = React.useCallback(() => {
    const trimmed = composerText.trim();
    if (!trimmed || !id) return;
    hideKeyboard();
    setComposerText('');
    setTimeout(() => {
      addComment(
        { postId: id, text: trimmed },
        {
          onError: () => {
            setComposerText(trimmed);
          },
        },
      );
      setComposerText('');
    }, 200);
  }, [addComment, composerText, id, hideKeyboard]);

  return (
    <View style={styles.flex}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={listHeader}
          ListFooterComponent={footer}
          ListEmptyComponent={listEmpty}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[ColorPalette.PrimaryButtonBackgroundMain]}
            />
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={0.35}
          style={styles.flatList}
        />
        <View
          style={[
            styles.composerBar,
            {
              paddingBottom: Math.max(insets.bottom, Spacing.small) + Platform.select({ ios: Math.min(keyboardHeight, 40), default: keyboardHeight }),
              paddingLeft: Spacing.medium + insets.left,
              paddingRight: Spacing.small + insets.right,
            },
          ]}>
          <DsSendMessage
            ref={composerInputRef}
            placeholder="Ваш комментарий"
            value={composerText}
            onChangeText={setComposerText}
            onSend={onSendComment}
            editable={!isAddingComment}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: ColorPalette.AppBackgroundLight,
  },
  flatList: {
    backgroundColor: ColorPalette.AppBackgroundLight,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 0,
    borderRadius: 12,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  hint: {
    color: ColorPalette.ActionDefaultTextMain,
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerEmpty: {
    backgroundColor: ColorPalette.AppScreenBackground,
    flex: 1,
    minHeight: Spacing.medium,
  },
  emptyComments: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  emptyCommentsText: {
    color: ColorPalette.AppTextLight,
    textAlign: 'center',
  },
  composerBar: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: ColorPalette.ActionDefaultBackgroundPressed,
    backgroundColor: ColorPalette.AppBackgroundLight,
    paddingTop: 10,
  },
});
