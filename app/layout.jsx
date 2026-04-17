// app/_layout.jsx
// Root layout for expo-router — sets up the navigation stack

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // We use custom headers in each screen
        contentStyle: { backgroundColor: '#F3F4F6' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="timetable" />
    </Stack>
  );
}
