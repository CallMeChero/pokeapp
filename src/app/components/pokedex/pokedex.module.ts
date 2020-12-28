import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CountToModule } from 'angular-count-to';
import { PokedexRoutingModule } from './pokedex-routing.module';
import { PokedexOverviewComponent } from './pokedex-overview/pokedex-overview.component';

@NgModule({
  declarations: [
    PokedexOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    PokedexRoutingModule
  ]
})
export class PokedexModule { }
