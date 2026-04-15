import { StyleSheet } from 'react-native';

import { BorderRadius, ColorPalette, Spacing } from '@/constants/theme';

export const dsSendMessageStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.small,
  },
  inputWrap: {
    flex: 1,
    borderRadius: BorderRadius.input,
    backgroundColor: ColorPalette.ActionDefaultBackgroundMain,
  },
});
