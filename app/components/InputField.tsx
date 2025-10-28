// app/components/InputField.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

type Props = TextInputProps & {
  label?: string;
  error?: string | undefined;
  value?: string;
  onChangeText?: (t: string) => void;
};

export default function InputField({ label, error, style, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput style={[styles.input, error && styles.inputError, style]} {...rest} />
      {error ? <Text style={styles.err}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  label: { marginBottom: 6, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#E6EEF7', padding: 12, borderRadius: 8, backgroundColor: '#fff' },
  inputError: { borderColor: '#ef4444' },
  err: { color: '#ef4444', marginTop: 6 },
});