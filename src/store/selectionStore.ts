import { create } from 'zustand';
import { PokemonData } from '../types/types';

interface SelectionState {
  selectedItems: PokemonData[];
  toggleItem: (item: PokemonData) => void;
  clearSelection: () => void;
}

export const useSelectionStore = create<SelectionState>((set, get) => ({
  selectedItems: [],
  toggleItem: (item) => {
    const items = get().selectedItems;
    const exists = items.find((i) => i.name === item.name);
    if (exists) {
      set({ selectedItems: items.filter((i) => i.name !== item.name) });
    } else {
      set({ selectedItems: [...items, item] });
    }
  },
  clearSelection: () => set({ selectedItems: [] }),
}));
