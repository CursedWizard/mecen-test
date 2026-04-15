import * as React from 'react';
import { Gesture } from 'react-native-gesture-handler';
import {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  actionButtonTokens,
  actionButtonVariantTransitionMs,
  pressAnimationDurationMs,
} from './styles';
import type { DsButtonActionMode, DsButtonActionVariant } from './types';

export function useActionButtonAnimation(
  variant: DsButtonActionVariant | undefined,
  mode: DsButtonActionMode | undefined,
  onPress: (() => void) | undefined,
) {
  const v = variant ?? 'default';
  const m = mode ?? 'main';
  const isInteractive = m === 'main';

  const variantProgress = useSharedValue(v === 'active' ? 1 : 0);
  const pressed = useSharedValue(0);

  React.useEffect(() => {
    variantProgress.value = withTiming(v === 'active' ? 1 : 0, {
      duration: actionButtonVariantTransitionMs,
    });
  }, [v, variantProgress]);

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

  const animatedContainerStyle = useAnimatedStyle(() => {
    if (m === 'disabled') {
      const bg0 = actionButtonTokens.default.background.disabled;
      const bg1 = actionButtonTokens.active.background.disabled;
      const backgroundColor = interpolateColor(variantProgress.value, [0, 1], [bg0, bg1]);
      return { backgroundColor };
    }
    const rest0 = actionButtonTokens.default.background.main;
    const rest1 = actionButtonTokens.active.background.main;
    const press0 = actionButtonTokens.default.background.pressed;
    const press1 = actionButtonTokens.active.background.pressed;
    const rest = interpolateColor(variantProgress.value, [0, 1], [rest0, rest1]);
    const press = interpolateColor(variantProgress.value, [0, 1], [press0, press1]);
    const backgroundColor = interpolateColor(pressed.value, [0, 1], [rest, press]);
    return { backgroundColor };
  }, [m]);

  const animatedLabelStyle = useAnimatedStyle(() => {
    if (m === 'disabled') {
      const c0 = actionButtonTokens.default.text.disabled;
      const c1 = actionButtonTokens.active.text.disabled;
      const color = interpolateColor(variantProgress.value, [0, 1], [c0, c1]);
      return { color };
    }
    const rest0 = actionButtonTokens.default.text.main;
    const rest1 = actionButtonTokens.active.text.main;
    const press0 = actionButtonTokens.default.text.pressed;
    const press1 = actionButtonTokens.active.text.pressed;
    const rest = interpolateColor(variantProgress.value, [0, 1], [rest0, rest1]);
    const press = interpolateColor(variantProgress.value, [0, 1], [press0, press1]);
    const color = interpolateColor(pressed.value, [0, 1], [rest, press]);
    return { color };
  }, [m]);

  return { gesture, pressed, variantProgress, animatedContainerStyle, animatedLabelStyle };
}

/** Press in/out + variant progress for a transparent `Pressable` action (no pill background). */
export function useActionButtonPressableInteraction(
  variant: DsButtonActionVariant | undefined,
  mode: DsButtonActionMode | undefined,
) {
  const v = variant ?? 'default';

  const variantProgress = useSharedValue(v === 'active' ? 1 : 0);
  const pressed = useSharedValue(0);

  React.useEffect(() => {
    variantProgress.value = withTiming(v === 'active' ? 1 : 0, {
      duration: actionButtonVariantTransitionMs,
    });
  }, [v, variantProgress]);

  const onPressIn = React.useCallback(() => {
    pressed.value = withTiming(1, { duration: pressAnimationDurationMs });
  }, [pressed]);

  const onPressOut = React.useCallback(() => {
    pressed.value = withTiming(0, { duration: pressAnimationDurationMs });
  }, [pressed]);

  return { pressed, variantProgress, onPressIn, onPressOut };
}
