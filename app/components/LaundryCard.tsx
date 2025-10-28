// app/components/LaundryCard.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { LaundryItem } from '../../store/useLaundryStore';

type Props = {
  item: LaundryItem;
  onPress: () => void;
  onNext?: (id: string) => void;    // optional
  onDelete?: (id: string) => void;  // optional
};

export default function LaundryCard({ item, onPress, onNext, onDelete }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.left}>
        <Text style={styles.name}>{item.customer}</Text>
        <Text style={styles.meta}>
          {item.count ?? 0} pcs • {item.weightKg ?? 0} kg • {item.service}
        </Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>

      <View style={styles.actions}>
        {onNext ? (
          <TouchableOpacity onPress={() => onNext(item.id)} style={styles.next}>
            <Text style={styles.nextText}>{item.status === 'Selesai' ? '✓' : 'Next'}</Text>
          </TouchableOpacity>
        ) : null}

        {onDelete ? (
          <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.delete}>
            <Text style={styles.deleteText}>Hapus</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  left: { flex: 1, paddingRight: 8 },
  name: { fontSize: 16, fontWeight: '700' },
  meta: { color: '#64748b', marginTop: 6 },
  status: { marginTop: 6, fontWeight: '700' },
  actions: { alignItems: 'flex-end', justifyContent: 'center' },
  next: {
    backgroundColor: '#eef2ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 6,
  },
  nextText: { color: '#4338ca', fontWeight: '700' },
  delete: {},
  deleteText: { color: '#ef4444', fontWeight: '700' },
});