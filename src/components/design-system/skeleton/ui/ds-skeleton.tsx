import * as React from 'react';
import { View } from 'react-native';

import { skeletonStyles } from '../styles';
import type { DsSkeletonProps } from '../types';

export function DsSkeleton({ width, height, style }: DsSkeletonProps) {
  return <View style={[skeletonStyles.root, { width, height }, style]} />;
}
