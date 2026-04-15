import * as React from 'react';
import {
  type LayoutChangeEvent,
  Text,
  type TextInput,
  View
} from 'react-native';

import { dsTextInputStyles } from '@/components/design-system/text-input/styles';
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
    style,
    value,
    onChangeText,
    ...textInputProps
  },
  ref,
) {
  const [inputHeight, setInputHeight] = React.useState(minHeight);
  const lastHeight = React.useRef(minHeight);

  const [internalText, setInternalText] = React.useState(() => {
    const dv = textInputProps.defaultValue;
    return dv !== undefined && dv !== null ? String(dv) : '';
  });

  const textForMirror = value ?? internalText;

  const handleChangeText = React.useCallback(
    (text: string) => {
      if (value === undefined) {
        setInternalText(text);
      }
      onChangeText?.(text);
    },
    [onChangeText, value],
  );

  const handleMirrorLayout = React.useCallback(
    (e: LayoutChangeEvent) => {
      const measured = Math.ceil(e.nativeEvent.layout.height);
      const newHeight = Math.max(Math.min(measured, maxHeight), minHeight);
      const shouldChange = Math.abs(lastHeight.current - newHeight) > 5;
      if (shouldChange) {
        setInputHeight(newHeight);
        lastHeight.current = newHeight;
      }
    },
    [maxHeight, minHeight],
  );

  const mirrorStyle = React.useMemo(
    () => [dsTextInputStyles.input, dsGrowingTextInputStyles.input, dsGrowingTextInputStyles.measureMirror, style],
    [style],
  );

  const inputStyle = React.useMemo(
    () => [dsGrowingTextInputStyles.input, { minHeight, maxHeight, height: inputHeight }, style],
    [inputHeight, maxHeight, minHeight, style],
  );

  return (
    <View style={dsGrowingTextInputStyles.root}>
      <Text
        allowFontScaling={false}
        accessible={false}
        importantForAccessibility="no-hide-descendants"
        onLayout={handleMirrorLayout}
        style={mirrorStyle}>
        {textForMirror}
      </Text>
      <DsTextInput
        ref={ref}
        {...textInputProps}
        {...(value !== undefined ? { value } : null)}
        onChangeText={handleChangeText}
        multiline
        scrollEnabled={inputHeight >= maxHeight}
        cursorColor={ColorPalette.PrimaryButtonBackgroundMain}
        style={inputStyle}
        allowFontScaling={false}
      />
    </View>
  );
});
