import { PokemonData } from '../types/types';

export const downloadCSV = (data: PokemonData[]) => {
  const headers = ['Name', 'Description', 'Height', 'Weight', 'URL'];
  const rows = data.map((p) => [
    p.name,
    p.description,
    p.height,
    p.weight,
    `https://pokeapi.co/api/v2/pokemon/${p.name}`,
  ]);

  const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${data.length}_items.csv`;
  link.click();
};
