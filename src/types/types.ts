export interface PokemonData {
  name: string;
  description: string;
  image: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  abilities: string[];
  height: number;
  weight: number;
  baseXP: number;
}

export interface PokemonAPIResponse {
  name: string;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: 'hp' | 'attack' | 'defense' | 'speed' | string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  base_experience: number;
}

export interface State {
  items: PokemonData[];
  loading: boolean;
  error: string | null;
}
