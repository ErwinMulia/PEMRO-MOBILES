import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export interface ShoppingItem {
  id: string;
  nama: string;
  quantity: number;
  kategori: string;
  purchased: boolean;
}

interface ShoppingState {
  items: ShoppingItem[];
  addItem: (data: Omit<ShoppingItem, "id" | "purchased">) => void;
  editItem: (id: string, data: Partial<ShoppingItem>) => void;
  deleteItem: (id: string) => void;
  togglePurchased: (id: string) => void;
}

export const useShoppingStore = create<ShoppingState>((set) => ({
  items: [],
  addItem: ({ nama, quantity, kategori }) =>
    set((state) => ({
      items: [...state.items, { id: uuidv4(), nama, quantity, kategori, purchased: false }],
    })),
  editItem: (id, data) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, ...data } : item)),
    })),
  deleteItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  togglePurchased: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      ),
    })),
}));