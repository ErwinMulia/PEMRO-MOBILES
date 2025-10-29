import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ShoppingItem } from "../../store/useShoppingStore";
import { useThemeStore } from "../../store/useThemeStore";
import { lightColors, darkColors } from "../utils/theme";

interface Props {
  item: ShoppingItem;
  onPress: () => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function ShoppingCard({ item, onPress, onDelete, onToggle }: Props) {
  const darkMode = useThemeStore((state) => state.darkMode);
  const colors = darkMode ? darkColors : lightColors;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.nama, { color: colors.text }]}>{item.nama}</Text>
        <Text style={{ color: colors.text }}>
          Qty: {item.quantity} • {item.kategori}
        </Text>
        <Text style={{ color: item.purchased ? "green" : colors.text, fontWeight: "700" }}>
          {item.purchased ? "Sudah dibeli" : "Belum dibeli"}
        </Text>
      </View>

      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity onPress={() => onToggle(item.id)}>
          <Text style={{ color: colors.primary, fontWeight: "700", marginBottom: 4 }}>
            {item.purchased ? "Undo" : "Beli"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Text style={{ color: "red", fontWeight: "700" }}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", padding: 12, borderRadius: 10, marginBottom: 8 },
  nama: { fontWeight: "700", fontSize: 16 },
});