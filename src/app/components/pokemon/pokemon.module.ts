import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonOverviewComponent } from './pokemon-overview/pokemon-overview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CountToModule } from 'angular-count-to';

@NgModule({
  declarations: [PokemonOverviewComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    PokemonRoutingModule,
    CountToModule
  ]
})
export class PokemonModule { }
