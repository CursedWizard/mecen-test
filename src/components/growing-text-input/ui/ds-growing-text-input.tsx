import * as React from 'react';
import { type NativeSyntheticEvent, type TextInput, type TextInputContentSizeChangeEventData } from 'react-native';

import { DsTextInput } from '@/components/design-system/text-input/ui/ds-text-input';
import { ColorPalette } from '@/constants/theme';
import {
  dsGrowingTextInputMaxHeight,
  dsGrowingTextInputMinHeight,
  dsGrowingTextInputStyles,
} from '../styles';
import type { DsGrowingTextInputProps } from '../types';

export const DsGrowingTextInput = React.forwardRef<TextInput, DsGrowingTextInputProps>(function DsGrowingTextInput(
  {
    minHeight = dsGrowingTextInputMinHeight,
    maxHeight = dsGrowingTextInputMaxHeight,
    onContentSizeChange,
    style,
    value,
    onChangeText,
    ...textInputProps
  },
  ref,
) {
  const [inputHeight, setInputHeight] = React.useState(minHeight);
  const currentValue = React.useRef(value);
  const lastHeight = React.useRef(minHeight);

  React.useEffect(() => {
    if (value === '') {
      setInputHeight(minHeight);
      lastHeight.current = minHeight;
    }
  }, [minHeight, value]);

  const handleChangeText = React.useCallback((text: string) => {
    currentValue.current = text;
    onChangeText?.(text);
  }, [maxHeight, minHeight, onChangeText]);

  const handleContentSizeChange = React.useCallback(
    (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      const height = e.nativeEvent.contentSize.height;
      const newHeight = Math.max(Math.min(height, maxHeight), minHeight);
      const shouldChange = Math.abs(lastHeight.current - newHeight) > 5;
      if (shouldChange) {
        setInputHeight(newHeight);
        lastHeight.current = newHeight;
        onContentSizeChange?.(e);
      }
    },
    [maxHeight, minHeight, onContentSizeChange, lastHeight],
  );

  return (
    <DsTextInput
      ref={ref}
      {...textInputProps}
      {...(value !== undefined ? { value } : null)}
      onChangeText={handleChangeText}
      multiline
      scrollEnabled={inputHeight >= maxHeight}
      cursorColor={ColorPalette.PrimaryButtonBackgroundMain}
      onContentSizeChange={handleContentSizeChange}
      style={[dsGrowingTextInputStyles.input, { minHeight, maxHeight, height: inputHeight }, style]}
      allowFontScaling={false}
    />
  );
});
