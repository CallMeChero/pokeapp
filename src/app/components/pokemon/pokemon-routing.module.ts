import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonOverviewComponent } from './pokemon-overview/pokemon-overview.component';

const routes: Routes = [
  {
    path: 'overview',
    component: PokemonOverviewComponent,
    data: {
      title: "Pokemons",
      breadcrumb: "Pokemon list",
      icon: "gitlab"
    }
  },
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
