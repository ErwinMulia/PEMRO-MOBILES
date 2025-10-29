//app/_layout.tsx
import { Stack } from "expo-router";
import 'react-native-get-random-values';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import React from "react";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Daftar Laundry" }} />
        <Stack.Screen name="add" options={{ title: "Tambah Laundry" }} />
      </Stack>
      <Toast />
    </GestureHandlerRootView>
  );
}