//store/useLaundryStore.tsx
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

// Struktur data untuk store
export interface LaundryItem {
  id: string;
  customer: string;
  count: number;
  weightKg: number;
  service: string;
  date: string;
  price: number;
  status: "Menunggu" | "Proses" | "Selesai";
}

// Input yang diterima store
export interface AddLaundryInput {
  customer: string;
  count: number;
  weightKg: number;
  service: string;
}

// Zustand store
interface LaundryState {
  laundries: LaundryItem[];
  addLaundry: (data: AddLaundryInput) => void;
  updateLaundryStatus: (id: string, status: LaundryItem["status"]) => void;
  clearLaundries: () => void;
}

export const useLaundryStore = create<LaundryState>()(
  persist(
    (set) => ({
      laundries: [],

      addLaundry: ({ customer, count, weightKg, service }) =>
        set((state) => {
          let pricePerKg = 5000;
          if (service === "Cuci+Setrika") pricePerKg = 8000;
          else if (service === "Setrika") pricePerKg = 4000;

          const newItem: LaundryItem = {
            id: uuidv4(),
            customer,
            count,
            weightKg,
            service,
            date: new Date().toISOString(),
            price: weightKg * pricePerKg,
            status: "Menunggu",
          };

          return { laundries: [...state.laundries, newItem] };
        }),

      updateLaundryStatus: (id, status) =>
        set((state) => ({
          laundries: state.laundries.map((laundry) =>
            laundry.id === id ? { ...laundry, status } : laundry
          ),
        })),

      clearLaundries: () => set({ laundries: [] }),
    }),
    {
      name: "laundry-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);