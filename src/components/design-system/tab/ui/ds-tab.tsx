import * as React from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { pressAnimationDurationMs, tabStyles, tabTokens } from '../styles';
import type { DsTabProps, TabSegmentProps } from '../types';

function TabSegment({ label, selected, onSelect }: TabSegmentProps) {
  const pressed = useSharedValue(0);

  const gesture = React.useMemo(
    () =>
      Gesture.Tap()
        .onBegin(() => {
          pressed.value = withTiming(1, { duration: pressAnimationDurationMs });
        })
        .onFinalize(() => {
          pressed.value = withTiming(0, { duration: pressAnimationDurationMs });
        })
        .onEnd((_e, success) => {
          if (success) {
            runOnJS(onSelect)();
          }
        }),
    [onSelect, pressed],
  );

  const chipStyle = useAnimatedStyle(() => {
    if (selected) {
      const bg = interpolateColor(
        pressed.value,
        [0, 1],
        [tabTokens.activeSegmentBackground, tabTokens.activePressBackground],
      );
      return { backgroundColor: bg };
    }
    const bg = interpolateColor(
      pressed.value,
      [0, 1],
      [tabTokens.inactiveIdleBackground, tabTokens.inactivePressBackground],
    );
    return { backgroundColor: bg };
  }, [selected]);

  const labelStyle = useAnimatedStyle(() => {
    if (selected) {
      return { color: tabTokens.activeLabel };
    }
    return { color: tabTokens.inactiveLabel };
  }, [selected]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        accessibilityLabel={label}
        accessibilityRole="tab"
        accessibilityState={{ selected }}
        style={[tabStyles.segment, chipStyle]}>
        <Animated.Text style={[tabStyles.segmentLabel, labelStyle]} numberOfLines={1}>
          {label}
        </Animated.Text>
      </Animated.View>
    </GestureDetector>
  );
}

export function DsTab({ items, selectedKey, onSelect, testID }: DsTabProps) {
  return (
    <View style={tabStyles.track} accessibilityRole="tablist" testID={testID}>
      {items.map((item) => (
        <TabSegment
          key={item.key}
          label={item.label}
          selected={item.key === selectedKey}
          onSelect={() => onSelect(item.key)}
        />
      ))}
    </View>
  );
}
