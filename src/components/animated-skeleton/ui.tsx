import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { animatedSkeletonStyles } from '@/components/animated-skeleton/styles';
import type { AnimatedSkeletonProps } from '@/components/animated-skeleton/types';

export function AnimatedSkeleton({ light = false, style }: AnimatedSkeletonProps) {
  const translateX = useSharedValue(0);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const colors = React.useMemo(() => {
    const color = light ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)';
    return ['transparent', color, 'transparent'] as [string, string, string];
  }, [light]);

  React.useEffect(() => {
    if (containerWidth <= 0) return;
    cancelAnimation(translateX);
    translateX.value = -containerWidth;
    translateX.value = withRepeat(
      withTiming(containerWidth, {
        duration: 1200,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      false,
    );
  }, [containerWidth, translateX]);

  const animatedGradientStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const onLayout = React.useCallback((e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setContainerWidth((prev) => (Math.abs(prev - w) < 0.5 ? prev : w));
  }, []);

  const trackWidth = containerWidth > 0 ? containerWidth * 2 : 0;

  return (
    <View style={[animatedSkeletonStyles.root, style]} onLayout={onLayout}>
      {trackWidth > 0 ? (
        <Animated.View
          style={[
            animatedSkeletonStyles.shimmerTrack,
            { width: trackWidth },
            animatedGradientStyle,
          ]}>
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={animatedSkeletonStyles.gradientFill}
          />
        </Animated.View>
      ) : null}
    </View>
  );
}
