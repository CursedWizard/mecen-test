import * as React from 'react';
import { TextInput, View } from 'react-native';

import { DsIconButton } from '@/components/design-system/icon-button/ui';
import { SendIcon } from '@/components/design-system/icons/send-icon';
import { ColorPalette } from '@/constants/theme';

import { DsGrowingTextInput } from '@/components/growing-text-input/ui';
import { dsSendMessageStyles } from '../styles';
import type { DsSendMessageProps } from '../types';

export const DsSendMessage = React.forwardRef<TextInput, DsSendMessageProps>(function DsSendMessage(
  { value, onChangeText, onSend, placeholder, editable = true, testID, style },
  ref,
) {
  const trimmed = value.trim();
  const sendDisabled = !trimmed || !editable;

  const onSendPress = React.useCallback(() => {
    if (!trimmed) return;
    onSend();
  }, [onSend, trimmed]);

  return (
    <View style={[dsSendMessageStyles.row, style]} testID={testID}>
      <View style={dsSendMessageStyles.inputWrap}>
        <DsGrowingTextInput
          ref={ref}
          editable={editable}
          placeholder={placeholder}
          placeholderTextColor={ColorPalette.AppTextSecondary}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <DsIconButton
        accessibilityLabel="Отправить"
        disabled={sendDisabled}
        onPress={onSendPress}
        testID={testID ? `${testID}-send` : undefined}>
        <SendIcon
          color={sendDisabled ? ColorPalette.PrimaryButtonBackgroundDisabled : ColorPalette.PrimaryButtonBackgroundMain}
          size={30}
        />
      </DsIconButton>
    </View>
  );
});
