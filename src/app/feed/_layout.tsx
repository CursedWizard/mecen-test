import { ColorPalette } from '@/constants/theme';
import { Slot } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FeedLayout() {
  return (
    <SafeAreaView style={styles.flex} edges={['top', 'left', 'right']}>
      <Slot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: ColorPalette.AppBackgroundLight,
  },
});