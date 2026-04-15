import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { scheduleOnRN } from 'react-native-worklets';
import { pressAnimationDurationMs, primaryButtonStyles, primaryButtonTokens } from '../styles';
import type { DsButtonProps } from '../types';

export function DsButton({ children, mode = 'main', onPress, style, testID }: DsButtonProps) {
  const pressed = useSharedValue(0);

  const isInteractive = mode === 'main';
  const isLoading = mode === 'loading';
  const isDisabled = mode === 'disabled';

  const gesture = React.useMemo(
    () =>
      Gesture.Tap()
        .enabled(isInteractive)
        .onBegin(() => {
          pressed.value = withTiming(1, { duration: pressAnimationDurationMs });
        })
        .onFinalize(() => {
          pressed.value = withTiming(0, { duration: pressAnimationDurationMs });
        })
        .onEnd((_e, success) => {
          if (success && onPress) {
            scheduleOnRN(onPress);
          }
        }),
    [isInteractive, onPress, pressed],
  );

  const animatedStyle = useAnimatedStyle(() => {
    if (isDisabled) {
      return {
        backgroundColor: primaryButtonTokens.background.disabled,
      };
    }
    if (isLoading) {
      return {
        backgroundColor: primaryButtonTokens.background.pressedOrLoading,
      };
    }
    const bg = interpolateColor(
      pressed.value,
      [0, 1],
      [primaryButtonTokens.background.main, primaryButtonTokens.background.pressedOrLoading],
    );
    return { backgroundColor: bg };
  }, [isDisabled, isLoading]);

  const textAnimatedStyle = useAnimatedStyle(() => {
    if (isDisabled) {
      return { color: primaryButtonTokens.text.disabled };
    }
    if (isLoading) {
      return { color: primaryButtonTokens.text.pressedOrLoading };
    }
    const color = interpolateColor(
      pressed.value,
      [0, 1],
      [primaryButtonTokens.text.main, primaryButtonTokens.text.pressedOrLoading],
    );
    return { color };
  }, [isDisabled, isLoading]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        accessibilityRole="button"
        accessibilityState={{ disabled: !isInteractive }}
        style={[primaryButtonStyles.root, animatedStyle, style]}
        testID={testID}>
        {isLoading ? (
          <ActivityIndicator color={primaryButtonTokens.text.pressedOrLoading} />
        ) : (
          <Animated.Text style={[primaryButtonStyles.label, textAnimatedStyle]}>{children}</Animated.Text>
        )}
      </Animated.View>
    </GestureDetector>
  );
}
