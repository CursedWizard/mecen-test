import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type DsIconButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  /** Outer touch target width/height (circular). Default 44. */
  size?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
};
