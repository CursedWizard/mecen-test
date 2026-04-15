import * as React from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { scheduleOnRN } from 'react-native-worklets';

import { pressAnimationDurationMs } from '../../buttons/styles';
import { dsIconButtonDefaultSize, dsIconButtonStyles, dsIconButtonTokens } from '../styles';
import type { DsIconButtonProps } from '../types';

export function DsIconButton({
  children,
  onPress,
  size = dsIconButtonDefaultSize,
  disabled = false,
  style,
  testID,
  accessibilityLabel,
}: DsIconButtonProps) {
  const pressed = useSharedValue(0);
  const radius = size / 2;

  const isInteractive = !disabled;

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

  const feedbackAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: disabled ? 0 : pressed.value,
      backgroundColor: dsIconButtonTokens.pressedBackground,
    };
  }, [disabled]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        style={[
          dsIconButtonStyles.root,
          { width: size, height: size, borderRadius: radius },
          style,
        ]}
        testID={testID}>
        <Animated.View
          pointerEvents="none"
          style={[
            dsIconButtonStyles.feedbackLayer,
            { borderRadius: radius },
            feedbackAnimatedStyle,
          ]}
        />
        <View style={[dsIconButtonStyles.content, { width: size, height: size }]}>{children}</View>
      </Animated.View>
    </GestureDetector>
  );
}
