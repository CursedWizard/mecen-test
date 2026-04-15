import { StyleSheet } from 'react-native';

import { ColorPalette } from '@/constants/theme';

export const animatedSkeletonStyles = StyleSheet.create({
  root: {
    overflow: 'hidden',
    backgroundColor: ColorPalette.ActionDefaultBackgroundMain,
  },
  shimmerTrack: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  gradientFill: {
    flex: 1,
    width: '30%',
    minHeight: '100%',
  },
});
