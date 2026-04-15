import { StyleSheet } from 'react-native';

import { ColorPalette } from '@/constants/theme';
import { manrope, typographyStyles } from '../typography/styles';

export const tabTokens = {
  trackBackground: ColorPalette.TabPillContainerBackground,
  trackBorder: ColorPalette.TabPillContainerBorder,
  indicatorBackground: ColorPalette.TabSegmentBackgroundActive,
  inactiveLabel: ColorPalette.TabLabelInactive,
  activeLabel: ColorPalette.TabLabelActive,
} as const;

export const pressAnimationDurationMs = 160;

export const tabSelectionAnimationDurationMs = 280;

const trackHorizontalPadding = 0;
const trackVerticalPadding = 0;

export { trackHorizontalPadding, trackVerticalPadding };

export const tabStyles = StyleSheet.create({
  track: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: tabTokens.trackBackground,
    borderWidth: 1,
    borderColor: tabTokens.trackBorder,
    borderRadius: 100,
    paddingVertical: trackVerticalPadding,
    paddingHorizontal: trackHorizontalPadding,
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    top: trackVerticalPadding,
    bottom: trackVerticalPadding,
    left: trackHorizontalPadding,
    borderRadius: 100,
    backgroundColor: tabTokens.indicatorBackground,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    zIndex: 1,
  },
  segmentLabel: {
    ...typographyStyles.tabLabel,
  },
  segmentLabelActive: {
    ...typographyStyles.tabLabel,
    fontFamily: manrope.bold,
  },
});
