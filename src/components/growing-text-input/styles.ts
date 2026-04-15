import { StyleSheet } from 'react-native';

import { ColorPalette } from '@/constants/theme';

import { typographyStyles } from '../design-system/typography/styles';

export const dsGrowingTextInputMinHeight = 44;
export const dsGrowingTextInputMaxHeight = 120;

export const dsGrowingTextInputStyles = StyleSheet.create({
  input: {
    ...typographyStyles.body,
    color: ColorPalette.AppTextLight,
    textAlignVertical: 'top',
  },
});
