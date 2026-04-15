import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

/** Field surface tokens (hex values from design spec). */
export const dsTextInputTokens = {
  background: {
    default: '#EFF2F7',
    pressed: '#E6E9EF',
  },
  focused: {
    background: '#FFFFFF',
    border: '#EFF2F7',
  },
  borderTransparent: 'transparent',
} as const;

export const dsTextInputBorderWidth = 2;

export const dsTextInputStyles = StyleSheet.create({
  input: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: Spacing.medium,
    borderWidth: dsTextInputBorderWidth,
    borderColor: dsTextInputTokens.borderTransparent,
    backgroundColor: dsTextInputTokens.background.default,
  },
});
