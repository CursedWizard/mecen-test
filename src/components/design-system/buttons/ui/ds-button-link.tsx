import * as React from 'react';
import { Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { buttonLinkStyles, linkButtonTokens, pressAnimationDurationMs } from '../styles';
import type { DsButtonLinkProps } from '../types';

const AnimatedText = Animated.createAnimatedComponent(Text);

export function DsButtonLink({ children, mode = 'main', onPress, style, testID }: DsButtonLinkProps) {
  const pressed = useSharedValue(0);
  const isInteractive = mode === 'main';

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
            runOnJS(onPress)();
          }
        }),
    [isInteractive, onPress, pressed],
  );

  const textStyle = useAnimatedStyle(() => {
    if (mode === 'disabled') {
      return { color: linkButtonTokens.text.disabled };
    }
    const color = interpolateColor(
      pressed.value,
      [0, 1],
      [linkButtonTokens.text.main, linkButtonTokens.text.pressed],
    );
    return { color };
  }, [mode]);

  return (
    <GestureDetector gesture={gesture}>
      <AnimatedText
        accessibilityRole="link"
        accessibilityState={{ disabled: !isInteractive }}
        style={[buttonLinkStyles.link, textStyle, style]}
        testID={testID}>
        {children}
      </AnimatedText>
    </GestureDetector>
  );
}
