//app/add.tsx
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useLaundryStore, AddLaundryInput } from "../store/useLaundryStore";

interface AddLaundryForm {
  customer: string;
  weightKg: string; // string karena TextInput
  service: string;
}

export default function AddLaundryScreen() {
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm<AddLaundryForm>({
    defaultValues: {
      customer: "",
      weightKg: "",
      service: "",
    },
  });

  const addLaundry = useLaundryStore((state) => state.addLaundry);

  const onSubmit: SubmitHandler<AddLaundryForm> = (data) => {
    const weight = parseFloat(data.weightKg);
    if (isNaN(weight)) {
      alert("Berat harus berupa angka!");
      return;
    }

    const input: AddLaundryInput = {
      customer: data.customer,
      count: 1,
      weightKg: weight,
      service: data.service,
    };

    addLaundry(input);
    reset();
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Laundry</Text>

      <Controller
        name="customer"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nama Pelanggan"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        name="weightKg"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Berat (kg)"
            keyboardType="numeric"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        name="service"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Jenis Layanan (Cuci, Setrika, Cuci+Setrika)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Button title="Simpan" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});