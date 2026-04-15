import * as Haptics from 'expo-haptics';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Easing, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

import { useActionButtonPressableInteraction } from '../hooks';
import { actionButtonTokens, buttonActionStyles } from '../styles';
import type { LikeActionButtonProps } from '../types';
import { LikeActionButtonHeart } from './like-action-button-heart';

const transparentPressableRoot = { backgroundColor: 'transparent' as const };
const labelGrey = { color: actionButtonTokens.default.text.main };

export function LikeActionButtonPressable(props: LikeActionButtonProps) {
  const { mode = 'main', variant = 'default', onPress, children, style, testID } = props;
  const heartScale = useSharedValue(1);

  const { pressed, variantProgress, onPressIn, onPressOut } =
    useActionButtonPressableInteraction(variant, mode);

  const isInteractive = mode === 'main';

  const handlePress = React.useCallback(() => {
    if (variant === 'default') {
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      heartScale.value = withSequence(
        withTiming(1.24, { duration: 150, easing: Easing.linear }),
        withTiming(1, { duration: 150, easing: Easing.linear }),
      );
    }
    onPress?.();
  }, [variant, heartScale, onPress]);

  const iconContext = React.useMemo(
    () => ({ pressed, variantProgress, mode }),
    [pressed, variantProgress, mode],
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !isInteractive }}
      android_ripple={null}
      disabled={!isInteractive}
      onPress={handlePress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[buttonActionStyles.root, transparentPressableRoot, style]}
      testID={testID}>
      <View style={buttonActionStyles.row}>
        <LikeActionButtonHeart
          {...iconContext}
          heartScale={heartScale}
          activeFilledUsesBackgroundColor
        />
        <Text style={[buttonActionStyles.label, labelGrey]}>{children}</Text>
      </View>
    </Pressable>
  );
}
