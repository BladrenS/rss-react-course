import { act } from 'react';
import { useSelectionStore } from '../store/selectionStore';

const mockItem = {
  name: 'pikachu',
  image: 'https://someurl.com/pikachu.png',
  stats: { hp: 35, attack: 55, defense: 40, speed: 90 },
  description: 'Electric mouse Pokémon',
  abilities: ['static'],
  height: 40,
  weight: 60,
  baseXP: 112,
};

describe('useSelectionStore', () => {
  beforeEach(() => {
    useSelectionStore.getState().clearSelection();
  });

  it('starts with empty selection', () => {
    const state = useSelectionStore.getState();
    expect(state.selectedItems).toEqual([]);
  });

  it('adds item to selection', () => {
    act(() => {
      useSelectionStore.getState().toggleItem(mockItem);
    });

    const state = useSelectionStore.getState();
    expect(state.selectedItems).toHaveLength(1);
    expect(state.selectedItems[0].name).toBe('pikachu');
  });

  it('removes item if it already exists (toggle off)', () => {
    act(() => {
      useSelectionStore.getState().toggleItem(mockItem);
      useSelectionStore.getState().toggleItem(mockItem);
    });

    const state = useSelectionStore.getState();
    expect(state.selectedItems).toEqual([]);
  });

  it('clears selection', () => {
    act(() => {
      useSelectionStore.getState().toggleItem(mockItem);
      useSelectionStore.getState().clearSelection();
    });

    const state = useSelectionStore.getState();
    expect(state.selectedItems).toEqual([]);
  });
});
