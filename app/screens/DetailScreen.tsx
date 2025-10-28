import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLaundryStore } from "../../store/useLaundryStore";
import { formatDate } from "../../FormatDate";

export default function DetailScreen() {
  const route = useRoute<any>();
  const { laundries } = useLaundryStore();
  const item = laundries.find((x) => x.id === route.params.id);

  if (!item) return <Text>Laundry tidak ditemukan</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.customer}</Text>
      <Text>Jumlah: {item.count} pcs</Text>
      <Text>Berat: {item.weightKg} kg</Text>
      <Text>Layanan: {item.service}</Text>
      <Text>Harga: Rp{item.price}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Tanggal: {formatDate(item.date)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
});