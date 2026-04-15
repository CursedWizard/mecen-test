import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { useActionButtonAnimation } from '../hooks';
import { buttonActionStyles } from '../styles';
import type { DsButtonActionProps } from '../types';
import { AnimatedActionButtonLabel } from './animated-action-button-label';

export const DsButtonAction = observer(({
  children,
  renderIcon,
  variant = 'default',
  mode = 'main',
  onPress,
  style,
  testID,
  smoothCountLabel,
}: DsButtonActionProps) => {
  const isInteractive = mode === 'main';

  const { gesture, pressed, variantProgress, animatedContainerStyle, animatedLabelStyle } =
    useActionButtonAnimation(variant, mode, onPress);

  const iconContext = React.useMemo(
    () => ({ pressed, variantProgress, mode }),
    [pressed, variantProgress, mode],
  );

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        accessibilityRole="button"
        accessibilityState={{ disabled: !isInteractive }}
        style={[buttonActionStyles.root, animatedContainerStyle, style]}
        testID={testID}>
        <View style={buttonActionStyles.row}>
          {renderIcon(iconContext)}
          <AnimatedActionButtonLabel
            smoothCount={smoothCountLabel}
            animatedColorStyle={animatedLabelStyle}>
            {children}
          </AnimatedActionButtonLabel>
        </View>
      </Animated.View>
    </GestureDetector>
  );
});
