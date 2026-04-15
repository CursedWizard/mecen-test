import * as React from 'react';
import { TextInput, type TextStyle } from 'react-native';
import Animated, {
  type AnimatedStyle,
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { actionButtonCountTransitionMs, buttonActionStyles } from '../styles';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type AnimatedActionButtonLabelProps = {
  children: React.ReactNode;
  animatedColorStyle: AnimatedStyle<TextStyle>;
  smoothCount?: boolean;
};

function parseCountLabel(children: React.ReactNode): number | null {
  if (typeof children === 'number' && Number.isFinite(children)) return Math.trunc(children);
  if (typeof children === 'string') {
    const n = Number.parseInt(children, 10);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

export function AnimatedActionButtonLabel({
  children,
  animatedColorStyle,
  smoothCount,
}: AnimatedActionButtonLabelProps) {
  const target = parseCountLabel(children);
  const display = useSharedValue(target ?? 0);

  React.useEffect(() => {
    if (!smoothCount || target === null) return;
    display.value = withTiming(target, {
      duration: actionButtonCountTransitionMs,
      easing: Easing.linear,
    });
  }, [smoothCount, target, display]);

  const animatedProps = useAnimatedProps(() => ({
    value: String(Math.round(display.value)),
  }));

  if (smoothCount && target !== null) {
    return (
      <AnimatedTextInput
        accessibilityRole="text"
        accessibilityValue={{ text: String(target) }}
        animatedProps={animatedProps}
        editable={false}
        importantForAccessibility="yes"
        pointerEvents="none"
        underlineColorAndroid="transparent"
        style={[buttonActionStyles.label, buttonActionStyles.countInput, animatedColorStyle]}
      />
    );
  }

  return (
    <Animated.Text style={[buttonActionStyles.label, animatedColorStyle]}>{children}</Animated.Text>
  );
}
