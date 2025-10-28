// app/components/ButtonPrimary.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ButtonPrimary({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.txt}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: '#0f172a', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  txt: { color: '#fff', fontWeight: '700', fontSize: 16 },
});