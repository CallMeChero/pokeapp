import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'pokemon',
    loadChildren: () => import('../../components/pokemon/pokemon.module').then(m => m.PokemonModule)
  },
  {
    path: 'pokedex',
    loadChildren: () => import('../../components/pokedex/pokedex.module').then(m => m.PokedexModule)
  }
];
