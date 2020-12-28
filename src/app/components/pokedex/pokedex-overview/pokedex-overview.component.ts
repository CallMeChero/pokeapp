import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { PokemonDetailComponent } from 'src/app/shared/components/pokemon-detail/pokemon-detail.component';
import { CUSTOM_DATATABLE_ICONS, IDatatableIcons } from 'src/app/shared/models/consts/datatable-icon.const';
import { IPokemonResponse } from '../../pokemon/models/response/pokemon.response';
import { PokedexService } from '../services/pokedex.service';

@Component({
  selector: 'poke-pokedex-overview',
  templateUrl: './pokedex-overview.component.html',
  styleUrls: ['./pokedex-overview.component.scss']
})
export class PokedexOverviewComponent implements OnInit {

   /* #region  Variables */
   rows: IPokemonResponse[] = [];
   loadingIndicator: boolean = true;
   currentEntryCount!: number;
   desiredPageSize: number = 8;
   desiredPageOffset: number = 0;
   columnMode: ColumnMode = ColumnMode.force;
   customClasses: IDatatableIcons = CUSTOM_DATATABLE_ICONS;
   /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _pokedexService: PokedexService,
    private _modal: NgbModal
  ) { }
  /* #endregion */

  /* #region  Methods */
  ngOnInit(): void {
    this.rows = this._pokedexService.getAll();
  }

  previewPokemon(pokemon: IPokemonResponse): void {
    const modal = this._modal.open(PokemonDetailComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modal.componentInstance.urlPokemonOverview = false;
    modal.componentInstance.pokemon = pokemon;
    modal.result.then((result) => { if(result) this._pokedexService.addToPokedex(pokemon); })
  }

  removeFromPokedex(row: IPokemonResponse): void {
    this._pokedexService.delete(row);
    // stavio bi forkJoin da je riječ o observable
    setTimeout(() => {
      this.rows = this._pokedexService.getAll();
    },200)
  }
  /* #endregion */
}
