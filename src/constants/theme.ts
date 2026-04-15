import { Platform } from 'react-native';

/**
 * Global color tokens (design system + app shell).
 * Import `ColorPalette` in components; use `Colors` for light/dark navigation / themed views.
 */
export enum ColorPalette {
  // Primary (solid) button
  PrimaryButtonBackgroundMain = '#6115CD',
  PrimaryButtonTextMain = '#FFFFFF',
  PrimaryButtonBackgroundPressedOrLoading = '#4E11A4',
  PrimaryButtonTextPressedOrLoading = '#DFD0F5',
  PrimaryButtonBackgroundDisabled = '#D5C9FF',
  PrimaryButtonTextDisabled = '#FFFFFF',

  // Action button — default variant
  ActionDefaultBackgroundMain = '#EFF2F7',
  ActionDefaultTextMain = '#57626F',
  ActionDefaultBackgroundPressed = '#DDDDDD',
  ActionDefaultTextPressed = '#57626F',
  ActionDefaultBackgroundDisabled = '#FFFFFF',
  ActionDefaultTextDisabled = '#B6BEC8',

  // Action button — active variant
  ActionActiveBackgroundMain = '#FF2B75',
  ActionActiveTextMain = '#FFEAF1',
  ActionActiveBackgroundPressed = '#EA276B',
  ActionActiveTextPressed = '#FFEAF1',
  ActionActiveBackgroundDisabled = '#FFBAD2',
  ActionActiveTextDisabled = '#FFEAF1',

  // Text link
  LinkTextMain = '#6115CD',
  LinkTextPressed = '#4E11A4',
  LinkTextDisabled = '#B6BEC8',

  // Tab strip
  TabBarTrackBackground = '#EFF2F7',
  TabLabelInactive = '#57626F',
  TabSegmentBackgroundActive = '#6115CD',
  TabLabelActive = '#FFFFFF',
  TabInactiveSegmentPressedBackground = '#DDDDDD',
  TabActiveSegmentPressedBackground = '#4E11A4',
  TabInactiveIdleBackground = '#00000000',

  // App shell (Expo template screens, navigation)
  AppBackgroundLight = '#FFFFFF',
  AppBackgroundDark = '#151718',
  AppTextLight = '#11181C',
  AppTextDark = '#ECEDEE',
  AppIconMutedLight = '#687076',
  AppIconMutedDark = '#9BA1A6',
  AppTextSecondary = '#68727D',
  AppScreenBackground = '#F5F8FD',

  IconButtonPressedBackground = '#EFF2F7',
}

export const Spacing = {
  tiny: 4,
  small: 8,
  mediumSmall: 12,
  medium: 16,
  large: 24,
};

export const BorderRadius = {
  default: 12,
  input: 20,
  full: 9999,
};

export const Sizes = {
  avatar: 40,
  coverHeight: 393,
};

export const Colors = {
  light: {
    text: ColorPalette.AppTextLight,
    background: ColorPalette.AppBackgroundLight,
    tint: ColorPalette.PrimaryButtonBackgroundMain,
    icon: ColorPalette.AppIconMutedLight,
    tabIconDefault: ColorPalette.ActionDefaultTextMain,
    tabIconSelected: ColorPalette.PrimaryButtonBackgroundMain,
  },
  dark: {
    text: ColorPalette.AppTextDark,
    background: ColorPalette.AppBackgroundDark,
    tint: ColorPalette.PrimaryButtonTextMain,
    icon: ColorPalette.AppIconMutedDark,
    tabIconDefault: ColorPalette.AppIconMutedDark,
    tabIconSelected: ColorPalette.PrimaryButtonTextMain,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
