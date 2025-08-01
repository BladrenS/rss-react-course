import { PokemonData } from '../types/types';
import { useSelectionStore } from '../store/selectionStore';

export const Card = (item: PokemonData) => {
  const { selectedItems, toggleItem } = useSelectionStore();
  const isSelected = selectedItems.some((i) => i.name === item.name);

  return (
    <div className="border rounded-lg shadow-md p-4 mb-4 flex items-start space-x-4 bg-white w-3xs text-center relative">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => toggleItem(item)}
        onClick={(e) => e.stopPropagation()}
        className="absolute w-4 h-4"
      />
      <img src={item.image} className="w-24 h-24 object-contain" />
      <div>
        <h2 className="text-xl font-bold capitalize">{item.name}</h2>
        <div className="text-sm mb-1">
          <strong className="block">Stats:</strong>{' '}
          <div>
            <span className="text-green-500">HP: {item.stats.hp},</span>{' '}
            <span className="text-red-500">ATK: {item.stats.attack},</span>
          </div>
          <div>
            <span className="text-brown-500">DEF: {item.stats.defense},</span>{' '}
            <span className="text-yellow-500">SPD: {item.stats.speed}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
