import { Platform, StyleSheet } from 'react-native';

import { BorderRadius, ColorPalette, Spacing } from '@/constants/theme';
import { typographyStyles } from '../typography/styles';

export const primaryButtonTokens = {
  background: {
    main: ColorPalette.PrimaryButtonBackgroundMain,
    pressedOrLoading: ColorPalette.PrimaryButtonBackgroundPressedOrLoading,
    disabled: ColorPalette.PrimaryButtonBackgroundDisabled,
  },
  text: {
    main: ColorPalette.PrimaryButtonTextMain,
    pressedOrLoading: ColorPalette.PrimaryButtonTextPressedOrLoading,
    disabled: ColorPalette.PrimaryButtonTextDisabled,
  },
} as const;

export const actionButtonTokens = {
  default: {
    background: {
      main: ColorPalette.ActionDefaultBackgroundMain,
      pressed: ColorPalette.ActionDefaultBackgroundPressed,
      disabled: ColorPalette.ActionDefaultBackgroundDisabled,
    },
    text: {
      main: ColorPalette.ActionDefaultTextMain,
      pressed: ColorPalette.ActionDefaultTextPressed,
      disabled: ColorPalette.ActionDefaultTextDisabled,
    },
  },
  active: {
    background: {
      main: ColorPalette.ActionActiveBackgroundMain,
      pressed: ColorPalette.ActionActiveBackgroundPressed,
      disabled: ColorPalette.ActionActiveBackgroundDisabled,
    },
    text: {
      main: ColorPalette.ActionActiveTextMain,
      pressed: ColorPalette.ActionActiveTextPressed,
      disabled: ColorPalette.ActionActiveTextDisabled,
    },
  },
} as const;

export const linkButtonTokens = {
  text: {
    main: ColorPalette.LinkTextMain,
    pressed: ColorPalette.LinkTextPressed,
    disabled: ColorPalette.LinkTextDisabled,
  },
} as const;

export const pressAnimationDurationMs = 160;

/** Duration for interpolating action button colors between default and active variants. */
export const actionButtonVariantTransitionMs = 220;

/** Duration for linearly tweening displayed like counts between values. */
export const actionButtonCountTransitionMs = 240;

export const primaryButtonStyles = StyleSheet.create({
  root: {
    minHeight: 48,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typographyStyles.label,
  },
});

export const buttonActionStyles = StyleSheet.create({
  root: {
    alignSelf: 'flex-start',
    borderRadius: BorderRadius.full,
    paddingVertical: 6,
    paddingHorizontal: Spacing.mediumSmall,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.small,
  },
  iconSlot: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  /** Read-only `TextInput` styled like the label (for animated digit counts). */
  countInput: {
    fontSize: 13,
    fontWeight: '600',
    padding: 0,
    margin: 0,
    minWidth: 12,
    minHeight: 20,
    borderWidth: 0,
    backgroundColor: 'transparent',
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' ? { includeFontPadding: false } : {}),
  },
});

export const buttonLinkStyles = StyleSheet.create({
  link: {
    ...typographyStyles.body,
  },
});
