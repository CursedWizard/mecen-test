import { DsButton, DsTypography } from '@/components/design-system';
import { errorPlaceholderStyles } from '@/components/error-placeholder/styles';
import type { EmptyRequestResultProps } from '@/components/error-placeholder/types';
import * as React from 'react';
import { Image, View } from 'react-native';

const errorPlaceholder = require('../../assets/images/error_placeholder.png');

const defaultMessage = 'Что-то пошло не так';

export function EmptyRequestResult({ message = defaultMessage, onGoHome }: EmptyRequestResultProps) {
  return (
    <View style={errorPlaceholderStyles.root}>
      <Image source={errorPlaceholder} style={errorPlaceholderStyles.image} accessibilityIgnoresInvertColors />
      <DsTypography variant="headline" style={errorPlaceholderStyles.message}>
        {message}
      </DsTypography>
      <DsButton onPress={onGoHome} style={errorPlaceholderStyles.button}>На главную</DsButton>
    </View>
  );
}
