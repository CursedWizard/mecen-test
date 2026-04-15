import * as React from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { MessageCloudIcon } from '@/components/design-system/icons/message-cloud-icon';

import type { ActionButtonIconContext } from '../types';

type MessageCloudActionIconProps = ActionButtonIconContext;

export function MessageCloudActionIcon({ pressed }: MessageCloudActionIconProps) {
  const cloudScale = useSharedValue(1);

  const wrapperStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: cloudScale.value * interpolate(pressed.value, [0, 1], [1, 0.94]),
      },
    ],
  }));

  return (
    <Animated.View style={wrapperStyle}>
      <MessageCloudIcon size={24} />
    </Animated.View>
  );
}
