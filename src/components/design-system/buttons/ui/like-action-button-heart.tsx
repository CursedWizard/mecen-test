import * as React from 'react';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { LIKE_FILLED_PATH_D } from '@/components/design-system/icons/like-filled-icon';
import { LIKE_OUTLINE_PATH_D } from '@/components/design-system/icons/like-outline-icon';

import { actionButtonTokens } from '../styles';
import type { ActionButtonIconContext } from '../types';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export type LikeActionButtonHeartProps = ActionButtonIconContext & {
  heartScale: SharedValue<number>;
  /**
   * Filled (liked) heart uses active **background** tokens instead of active **text** tokens.
   * Use with a transparent container so the heart fill reads as the accent surface.
   */
  activeFilledUsesBackgroundColor?: boolean;
};

export function LikeActionButtonHeart({
  pressed,
  variantProgress,
  mode,
  heartScale,
  activeFilledUsesBackgroundColor = false,
}: LikeActionButtonHeartProps) {
  const wrapperStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: heartScale.value * interpolate(pressed.value, [0, 1], [1, 0.94]),
      },
    ],
  }));

  const outlineProps = useAnimatedProps(() => {
    if (mode === 'disabled') {
      const fill = actionButtonTokens.default.text.disabled;
      return { fill, opacity: 1 - variantProgress.value };
    }
    const rest = actionButtonTokens.default.text.main;
    const press = actionButtonTokens.default.text.pressed;
    const fill = interpolateColor(pressed.value, [0, 1], [rest, press]);
    return { fill, opacity: 1 - variantProgress.value };
  }, [mode]);

  const filledProps = useAnimatedProps(() => {
    if (mode === 'disabled') {
      const fill = activeFilledUsesBackgroundColor
        ? actionButtonTokens.active.background.disabled
        : actionButtonTokens.active.text.disabled;
      return { fill, opacity: variantProgress.value };
    }
    const activeRest = activeFilledUsesBackgroundColor
      ? actionButtonTokens.active.background.main
      : actionButtonTokens.active.text.main;
    const activePress = activeFilledUsesBackgroundColor
      ? actionButtonTokens.active.background.pressed
      : actionButtonTokens.active.text.pressed;
    const fill = interpolateColor(pressed.value, [0, 1], [activeRest, activePress]);
    return { fill, opacity: variantProgress.value };
  }, [activeFilledUsesBackgroundColor, mode]);

  return (
    <Animated.View style={wrapperStyle}>
      <Svg width={24} height={24} fill="none">
        <AnimatedPath d={LIKE_OUTLINE_PATH_D} animatedProps={outlineProps} />
        <AnimatedPath d={LIKE_FILLED_PATH_D} animatedProps={filledProps} />
      </Svg>
    </Animated.View>
  );
}
