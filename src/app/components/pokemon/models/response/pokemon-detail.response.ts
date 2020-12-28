import { IPokemonStats } from "./pokemon-stats.response";

export interface IPokemonDetailResponse {
  abilities;
  base_experience: number
  forms;
  game_indices;
  height: number;
  held_items;
  id: number
  is_default: boolean
  location_area_encounters: string;
  moves;
  name: string
  order: number;
  species
  sprites
  stats: IPokemonStats[];
  types
  weight: number
}
