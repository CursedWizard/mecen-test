import { ColorPalette } from '@/constants/theme';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FeedStackLayout() {
  return (
    <SafeAreaView style={styles.flex} edges={['top', 'left', 'right']}>
      <Stack
        screenOptions={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}>
        <Stack.Screen name="[id]" options={{ title: 'Пост', headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: ColorPalette.AppBackgroundLight,
  },
});