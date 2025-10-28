import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLaundryStore } from "../../store/useLaundryStore";
import LaundryCard from "../components/LaundryCard";

export default function HomeScreen() {
  const { laundries } = useLaundryStore();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Laundry</Text>
      <FlatList
        data={laundries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LaundryCard
            item={item}
            onPress={() => navigation.navigate("Detail", { id: item.id })}
          />
        )}
        ListEmptyComponent={<Text>Tidak ada data laundry.</Text>}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("Add")}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1E90FF",
    width: 55,
    height: 55,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: { color: "#fff", fontSize: 26 },
});