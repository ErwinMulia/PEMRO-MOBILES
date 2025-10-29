//app/index.tsx
import { useRouter } from "expo-router";
import React from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import LaundryCard from "../app/components/LaundryCard";
import { useLaundryStore } from "../store/useLaundryStore";

export default function HomeScreen() {
  const router = useRouter();
  const laundries = useLaundryStore((state) => state.laundries);
  const updateStatus = useLaundryStore((state) => state.updateLaundryStatus);
  const clearLaundries = useLaundryStore((state) => state.clearLaundries);

  return (
    <View style={styles.container}>
      <Button title="Tambah Laundry" onPress={() => router.push("/add")} />

      <FlatList
        data={laundries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LaundryCard
            item={item}
            onNext={(id) => {
              const next =
                item.status === "Menunggu"
                  ? "Proses"
                  : item.status === "Proses"
                  ? "Selesai"
                  : "Selesai";
              updateStatus(id, next);
            }}
            onPress={() => {}}
            onDelete={() =>
              updateStatus(item.id, "Menunggu") // contoh reset status
            }
          />
        )}
      />

      <Button title="Hapus Semua" color="red" onPress={clearLaundries} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
});