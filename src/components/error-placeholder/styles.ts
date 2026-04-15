import { ColorPalette } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const errorPlaceholderStyles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: ColorPalette.TabBarTrackBackground,
    paddingHorizontal: 16,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  message: {
    textAlign: 'center',
    color: ColorPalette.AppTextLight,
  },
  button: {
    width: '100%',
  },
});
