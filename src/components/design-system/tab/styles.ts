import { StyleSheet } from 'react-native';

import { ColorPalette } from '@/constants/theme';

export const tabTokens = {
  trackBackground: ColorPalette.TabBarTrackBackground,
  inactiveLabel: ColorPalette.TabLabelInactive,
  activeSegmentBackground: ColorPalette.TabSegmentBackgroundActive,
  activeLabel: ColorPalette.TabLabelActive,
  inactivePressBackground: ColorPalette.TabInactiveSegmentPressedBackground,
  activePressBackground: ColorPalette.TabActiveSegmentPressedBackground,
  inactiveIdleBackground: ColorPalette.TabInactiveIdleBackground,
} as const;

export const pressAnimationDurationMs = 160;

export const tabStyles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    padding: 6,
    borderRadius: 14,
    backgroundColor: tabTokens.trackBackground,
  },
  segment: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  segmentLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
});
