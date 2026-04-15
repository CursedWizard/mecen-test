import { StyleSheet } from 'react-native';

import { typographyStyles } from '@/components/design-system/typography/styles';
import { BorderRadius, ColorPalette, Sizes, Spacing } from '@/constants/theme';

const CARD_CONTENT_HORIZONTAL_PADDING = Spacing.medium;
export const paidTierCoverStyles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blur: {
    ...StyleSheet.absoluteFill,
  },
  tint: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
  },
  backdropPressable: {
    ...StyleSheet.absoluteFill,
  },
  foreground: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    alignItems: 'center',
    maxWidth: 320,
    gap: Spacing.small,
  },
  textBlock: {
    alignItems: 'center',
    gap: Spacing.tiny,
    marginBottom: Spacing.small,
  },
  iconOuter: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: ColorPalette.PrimaryButtonBackgroundMain,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: ColorPalette.PrimaryButtonTextMain,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
  },
  donateButton: {
    paddingHorizontal: 28,
    minWidth: 240,
  },
});

export const feedPostCardStyles = StyleSheet.create({
  card: {
    marginBottom: Spacing.medium,
    backgroundColor: ColorPalette.AppBackgroundLight,
    overflow: 'hidden',
    borderRadius: BorderRadius.default,
  },
  likeButton: {
    width: 90,
  },
  cardPressed: {
    opacity: 0.96,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.mediumSmall,
    paddingHorizontal: CARD_CONTENT_HORIZONTAL_PADDING,
    paddingTop: Spacing.mediumSmall,
    paddingBottom: Spacing.medium,
  },
  avatar: {
    width: Sizes.avatar,
    height: Sizes.avatar,
    borderRadius: BorderRadius.full,
    backgroundColor: ColorPalette.ActionDefaultBackgroundMain,
  },
  displayName: {
    flex: 1,
    color: ColorPalette.AppTextLight,
  },
  coverWrap: {
    width: '100%',
    height: Sizes.coverHeight,
    backgroundColor: ColorPalette.TabBarTrackBackground,
    overflow: 'hidden',
  },
  coverBlurTarget: {
    ...StyleSheet.absoluteFillObject,
  },
  coverImage: {
    ...StyleSheet.absoluteFillObject,
  },
  textBlock: {
    paddingHorizontal: CARD_CONTENT_HORIZONTAL_PADDING,
    paddingTop: Spacing.small,
    paddingBottom: 4,
    gap: Spacing.small,
  },
  title: {
    color: ColorPalette.AppTextLight,
  },
  readMoreLink: {
    ...typographyStyles.body,
    color: ColorPalette.LinkTextMain,
    fontFamily: typographyStyles.body.fontFamily,
    flexShrink: 0,
    flex: 1,
  },
  metrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.small,
    paddingHorizontal: CARD_CONTENT_HORIZONTAL_PADDING,
    paddingVertical: Spacing.mediumSmall,
  },
  paidSkeletonBlock: {
    paddingHorizontal: CARD_CONTENT_HORIZONTAL_PADDING,
    paddingTop: Spacing.mediumSmall,
    paddingBottom: Spacing.medium,
    gap: 10,
    width: '100%',
  },
});

export const feedPostCardSkeletonStyles = StyleSheet.create({
  nameBar: {
    height: 20,
    borderRadius: BorderRadius.skeleton,
    flex: 1,
    minWidth: 0,
    maxWidth: '40%',
  },
  titleLine: {
    height: 26,
    borderRadius: BorderRadius.skeleton,
    width: '30%',
  },
  bodyLine: {
    height: 20,
    borderRadius: BorderRadius.skeleton,
    width: '100%',
  },
  likeActionSkeleton: {
    width: 90,
    minHeight: 36,
    borderRadius: BorderRadius.full,
  },
  commentsActionSkeleton: {
    width: 88,
    minHeight: 36,
    borderRadius: BorderRadius.full,
  },
});

export const feedPostDetailStyles = StyleSheet.create({
  commentsMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: CARD_CONTENT_HORIZONTAL_PADDING,
    paddingBottom: Spacing.small,
    paddingTop: Spacing.medium,
    gap: Spacing.small,
    backgroundColor: ColorPalette.AppBackgroundLight,
  },
  postCard: {
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  commentsMetaCount: {
    flex: 1,
    color: ColorPalette.AppTextSecondary,
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.mediumSmall,
    paddingHorizontal: CARD_CONTENT_HORIZONTAL_PADDING,
    paddingVertical: Spacing.small,
    backgroundColor: ColorPalette.AppBackgroundLight,
    borderRadius: BorderRadius.default,
  },
  commentAvatar: {
    width: Sizes.avatar,
    height: Sizes.avatar,
    borderRadius: BorderRadius.full,
    backgroundColor: ColorPalette.ActionDefaultBackgroundMain,
  },
  commentTextColumn: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  commentAuthorName: {
    color: ColorPalette.AppTextLight,
  },
  commentBody: {
    color: ColorPalette.AppTextLight,
  },
  commentLikeButton: {
    width: 72,
    marginTop: 2,
  },
});
