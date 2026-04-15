import type { TextProps } from 'react-native';

export type DsTypographyVariant = 'headline' | 'body' | 'bodyBold' | 'label' | 'caption';

export type DsTypographyProps = TextProps & {
  /** Text style preset; defaults to `body`. */
  variant?: DsTypographyVariant;
};
