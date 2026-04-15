import { StyleSheet } from 'react-native';

import { ColorPalette } from '@/constants/theme';

import { typographyStyles } from '../design-system/typography/styles';

export const dsGrowingTextInputMinHeight = 44;
export const dsGrowingTextInputMaxHeight = 120;

export const dsGrowingTextInputStyles = StyleSheet.create({
  root: {
    width: '100%',
  },
  /** Invisible text used only to measure wrapped height (reliable on iOS vs onContentSizeChange + fixed height). */
  measureMirror: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    opacity: 0,
    pointerEvents: 'none',
    zIndex: 0,
  },
  input: {
    ...typographyStyles.body,
    color: ColorPalette.AppTextLight,
    textAlignVertical: 'top',
    zIndex: 1,
  },
});
