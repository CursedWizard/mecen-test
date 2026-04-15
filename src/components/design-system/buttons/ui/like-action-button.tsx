import * as Haptics from 'expo-haptics';
import * as React from 'react';
import { Easing, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

import type { LikeActionButtonProps } from '../types';
import { DsButtonAction } from './ds-button-action';
import { LikeActionButtonHeart } from './like-action-button-heart';

export function LikeActionButton(props: LikeActionButtonProps) {
  const { mode = 'main', onPress, ...rest } = props;
  const heartScale = useSharedValue(1);

  const handlePress = React.useCallback(() => {
    if (props.variant === 'default') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      heartScale.value = withSequence(
        withTiming(1.24, { duration: 150, easing: Easing.linear }),
        withTiming(1, { duration: 150, easing: Easing.linear }),
      );
    }
    onPress?.();
  }, [props.variant, heartScale, onPress]);

  return (
    <DsButtonAction
      {...rest}
      onPress={handlePress}
      mode={mode}
      smoothCountLabel={false}
      renderIcon={(ctx) => <LikeActionButtonHeart {...ctx} heartScale={heartScale} />}
    />
  );
}
