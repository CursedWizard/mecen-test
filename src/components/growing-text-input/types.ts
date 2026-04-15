import type { TextInputProps } from 'react-native';

export type DsGrowingTextInputProps = Omit<TextInputProps, 'multiline' | 'onContentSizeChange' | 'style'> & {
  minHeight?: number;
  maxHeight?: number;
  style?: TextInputProps['style'];
  onContentSizeChange?: TextInputProps['onContentSizeChange'];
};
