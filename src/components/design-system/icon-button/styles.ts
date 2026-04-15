import { StyleSheet } from 'react-native';

import { ColorPalette } from '@/constants/theme';

/** Touch feedback: light grey circle, aligned with action button pressed token. */
export const dsIconButtonTokens = {
  pressedBackground: ColorPalette.IconButtonPressedBackground,
} as const;

export const dsIconButtonDefaultSize = 44;

export const dsIconButtonStyles = StyleSheet.create({
  root: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  /** Grey disk behind the icon; opacity driven by Reanimated. */
  feedbackLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
