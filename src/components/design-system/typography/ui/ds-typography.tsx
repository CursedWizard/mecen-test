import * as React from 'react';
import { Text } from 'react-native';

import { typographyStyles } from '../styles';
import type { DsTypographyProps } from '../types';

export function DsTypography({ variant = 'body', style, ...rest }: DsTypographyProps) {
  return <Text style={[typographyStyles[variant], style]} {...rest} />;
}
