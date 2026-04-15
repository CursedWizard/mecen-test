import * as React from 'react';
import { TextInput as RNTextInput, type BlurEvent, type FocusEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { pressAnimationDurationMs } from '../../buttons/styles';
import {
  dsTextInputBorderWidth,
  dsTextInputStyles,
  dsTextInputTokens,
} from '../styles';
import type { DsTextInputProps } from '../types';

const AnimatedTextInput = Animated.createAnimatedComponent(RNTextInput);

export const DsTextInput = React.forwardRef<RNTextInput, DsTextInputProps>(function DsTextInput(
  { editable = true, onBlur, onFocus, style, ...rest },
  ref,
) {
  const pressed = useSharedValue(0);
  const focused = useSharedValue(0);

  const isInteractive = editable !== false;

  const gesture = React.useMemo(
    () =>
      Gesture.Simultaneous(
        Gesture.Native(),
        Gesture.Tap()
          .enabled(isInteractive)
          .onBegin(() => {
            pressed.value = withTiming(1, { duration: pressAnimationDurationMs });
          })
          .onFinalize(() => {
            pressed.value = withTiming(0, { duration: pressAnimationDurationMs });
          }),
      ),
    [isInteractive, pressed],
  );

  const handleFocus = React.useCallback(
    (e: FocusEvent) => {
      focused.value = 1;
      onFocus?.(e);
    },
    [focused, onFocus],
  );

  const handleBlur = React.useCallback(
    (e: BlurEvent) => {
      focused.value = 0;
      onBlur?.(e);
    },
    [focused, onBlur],
  );

  const animatedStyle = useAnimatedStyle(() => {
    if (focused.value === 1) {
      return {
        backgroundColor: dsTextInputTokens.focused.background,
        borderColor: dsTextInputTokens.focused.border,
        borderWidth: dsTextInputBorderWidth,
      };
    }
    const backgroundColor = interpolateColor(
      pressed.value,
      [0, 1],
      [dsTextInputTokens.background.default, dsTextInputTokens.background.pressed],
    );
    return {
      backgroundColor,
      borderColor: dsTextInputTokens.borderTransparent,
      borderWidth: dsTextInputBorderWidth,
    };
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <AnimatedTextInput
        ref={ref}
        editable={editable}
        onBlur={handleBlur}
        onFocus={handleFocus}
        style={[dsTextInputStyles.input, animatedStyle, style]}
        {...rest}
      />
    </GestureDetector>
  );
});
