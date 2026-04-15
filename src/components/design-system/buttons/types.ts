import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

export type DsButtonMode = 'main' | 'loading' | 'disabled';

export type DsButtonProps = {
  children: ReactNode;
  mode?: DsButtonMode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export type DsButtonActionVariant = 'default' | 'active';
export type DsButtonActionMode = 'main' | 'disabled';

/** Shared animation state passed to `DsButtonAction` icons for coordinated colors. */
export type ActionButtonIconContext = {
  pressed: SharedValue<number>;
  variantProgress: SharedValue<number>;
  mode: DsButtonActionMode;
};

export type DsButtonActionProps = {
  children: ReactNode;
  renderIcon: (ctx: ActionButtonIconContext) => React.ReactNode;
  variant?: DsButtonActionVariant;
  mode?: DsButtonActionMode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  /**
   * When true, `children` must be a base-10 integer string. The shown value animates linearly
   * between old and new numbers when the string changes (UI-thread via animated props).
   */
  smoothCountLabel?: boolean;
};

export type DsButtonLinkMode = 'main' | 'disabled';

export type DsButtonLinkProps = {
  children: ReactNode;
  mode?: DsButtonLinkMode;
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
  testID?: string;
};

export type LikeActionButtonProps = Omit<DsButtonActionProps, 'renderIcon' | 'smoothCountLabel'>;
export type MessageCloudActionButtonProps = Omit<DsButtonActionProps, 'renderIcon' | 'smoothCountLabel'>;
