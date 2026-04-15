import { DsButton, DsTypography } from '@/components/design-system';
import { DollarIcon } from '@/components/design-system/icons/dollar-icon';
import { paidTierCoverStyles } from '@/features/feed/styles';
import type { PaidTierCoverOverlayProps } from '@/features/feed/types';
import { BlurView } from 'expo-blur';
import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';

export function PaidTierCoverOverlay({ blurTarget, onDonatePress }: PaidTierCoverOverlayProps) {
  const blurIntensity = Platform.OS === 'android' ? 40 : 75;
  const androidBlurProps =
    Platform.OS === 'android'
      ? ({ blurTarget, blurMethod: 'dimezisBlurView' } as const)
      : ({} as const);

  return (
    <View style={paidTierCoverStyles.root} pointerEvents="box-none">
      <BlurView {...androidBlurProps} intensity={blurIntensity} style={paidTierCoverStyles.blur} />
      <View style={paidTierCoverStyles.tint} pointerEvents="none" />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Открыть пост для доната"
        onPress={onDonatePress}
        style={paidTierCoverStyles.backdropPressable}
      />
      <View style={paidTierCoverStyles.foreground} pointerEvents="box-none">
        <View style={paidTierCoverStyles.column} pointerEvents="box-none">
          <View style={paidTierCoverStyles.iconOuter}>
            <DollarIcon size={20} />
          </View>
          <View style={paidTierCoverStyles.textBlock}>
            <DsTypography variant="label" style={paidTierCoverStyles.title}>
              Контент скрыт пользователем.
            </DsTypography>
            <DsTypography variant="label" style={paidTierCoverStyles.title}>
              Доступ откроется после доната
            </DsTypography>
          </View>
          <DsButton onPress={onDonatePress} style={paidTierCoverStyles.donateButton}>
            Отправить донат
          </DsButton>
        </View>
      </View>
    </View>
  );
}
