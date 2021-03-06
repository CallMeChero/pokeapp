import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokedexOverviewComponent } from './pokedex-overview/pokedex-overview.component';

const routes: Routes = [
  {
    path: 'overview',
    component: PokedexOverviewComponent,
    data: {
      title: "Pokedex",
      breadcrumb: "Pokemons In Pokedex",
      icon: "book-open"
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
export class PokedexRoutingModule { }
