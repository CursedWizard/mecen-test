import * as React from 'react';
import { type LayoutChangeEvent, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { scheduleOnRN } from 'react-native-worklets';
import {
  pressAnimationDurationMs,
  tabSelectionAnimationDurationMs,
  tabStyles,
  tabTokens,
  trackHorizontalPadding,
} from '../styles';
import type { DsTabProps, TabSegmentProps } from '../types';

function TabSegment({ index, label, selected, onSelect, activeIndex }: TabSegmentProps) {
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

  const labelStyle = useAnimatedStyle(() => {
    const t = activeIndex.value;
    const d = Math.abs(t - index);
    const av = 1 - Math.min(1, d);
    const color = interpolateColor(
      av,
      [0, 1],
      [tabTokens.inactiveLabel, tabTokens.activeLabel],
    );
    return {
      color,
      opacity: 0.9 + 0.1 * (1 - pressed.value),
    };
  }, [index]);

  const staticLabelStyle = selected ? tabStyles.segmentLabelActive : tabStyles.segmentLabel;

  return (
    <GestureDetector gesture={gesture}>
      <View
        style={tabStyles.segment}
        accessibilityLabel={label}
        accessibilityRole="tab"
        accessibilityState={{ selected }}>
        <Animated.Text style={[staticLabelStyle, labelStyle]} numberOfLines={1}>
          {label}
        </Animated.Text>
      </View>
    </GestureDetector>
  );
}

export function DsTab({ items, selectedKey, onSelect, testID, onAnimationEnd }: DsTabProps) {
  const numberOfItems = items.length;
  const selectedIndex = numberOfItems === 0 ? 0 : Math.max(0, items.findIndex((item) => item.key === selectedKey));
  const activeIndex = useSharedValue(selectedIndex);
  const segmentW = useSharedValue(0);

  React.useEffect(() => {
    if (numberOfItems === 0) {
      return;
    }
    const idx = Math.max(0, items.findIndex((item) => item.key === selectedKey));
    activeIndex.value = withTiming(idx, {
      duration: tabSelectionAnimationDurationMs,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }, () => {
      if (onAnimationEnd) {
        scheduleOnRN(onAnimationEnd, selectedKey);
      }
    });
  }, [numberOfItems, items, selectedKey, onAnimationEnd]);

  const onTrackLayout = React.useCallback(
    (e: LayoutChangeEvent) => {
      if (numberOfItems === 0) {
        return;
      }
      const { width } = e.nativeEvent.layout;
      const inner = width - 2 * trackHorizontalPadding;
      segmentW.value = inner / numberOfItems;
    },
    [numberOfItems],
  );

  const indicatorStyle = useAnimatedStyle(() => {
    const w = Math.max(0, segmentW.value);
    return {
      width: w,
      transform: [{ translateX: activeIndex.value * w }],
    };
  });

  if (numberOfItems === 0) {
    return null;
  }

  return (
    <View
      style={tabStyles.track}
      accessibilityRole="tablist"
      onLayout={onTrackLayout}
      testID={testID}>
      <Animated.View
        style={[tabStyles.indicator, indicatorStyle]}
        pointerEvents="none"
        importantForAccessibility="no"
      />
      {items.map((item, i) => (
        <TabSegment
          key={item.key}
          index={i}
          label={item.label}
          selected={item.key === selectedKey}
          onSelect={() => onSelect(item.key)}
          activeIndex={activeIndex}
        />
      ))}
    </View>
  );
}
