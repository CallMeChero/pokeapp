import { AfterViewInit, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IPokemonResponse } from '../models/response/pokemon.response';
import { PokemonService } from '../services/pokemon.service';
import { catchError,take } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { PageInfo } from 'src/app/shared/models/pagination/page-info';
import { IBasePagination } from 'src/app/shared/models/pagination/base-pagination';
import { CUSTOM_DATATABLE_ICONS, IDatatableIcons } from 'src/app/shared/models/consts/datatable-icon.const';
import { PokemonDetailComponent } from '../../../shared/components/pokemon-detail/pokemon-detail.component';
import { PokedexService } from '../../pokedex/services/pokedex.service';

@Component({
  selector: 'poke-pokemon-overview',
  templateUrl: './pokemon-overview.component.html',
  styleUrls: ['./pokemon-overview.component.scss']
})
export class PokemonOverviewComponent implements AfterViewInit {

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
     private _modal: NgbModal,
     private _notificationService: NotificationService,
     private _pokemonService: PokemonService,
     private _pokedexService: PokedexService
   ) {}
   /* #endregion */

  /* #region  Methods */
  public setPage(pageInfo: PageInfo): void {
    this.desiredPageOffset = pageInfo.offset;
    this.desiredPageSize = pageInfo.pageSize;
    this.getPokemons();
  }

  ngAfterViewInit(): void {
    this.getPokemons();
  }

  // Get all
  getPokemons(): void {
    this._pokemonService
      .getPaginated(this.desiredPageSize, this.desiredPageOffset)
      .pipe(
        take(1),
        catchError((err) => this.catchAndReplaceError(err)),
      )
      .subscribe((res: IBasePagination<IPokemonResponse>) => {
        this.rows = res.results;
        this.loadingIndicator = false;
        this.currentEntryCount = res.count;
      });
  }

  // Add or Edit
  previewPokemon(pokemon?: IPokemonResponse): void {
    const modal = this._modal.open(PokemonDetailComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
    modal.componentInstance.urlPokemonOverview = true;
    modal.componentInstance.pokemon = pokemon;
    modal.result.then((result) => { if(result) this._pokedexService.addToPokedex(pokemon); })
  }
  // Error handling
  catchAndReplaceError(errorMessage: string): Observable<never> {
    this._notificationService.fireErrorNotification(errorMessage);
    return EMPTY;
  }
  /* #endregion */

  /* #region  Getters */
  get entryCount(): number {
    return this.currentEntryCount ?? 0;
  }
  get desiredPage(): number {
    return this.desiredPageOffset + 1;
  }
  /* #endregion */
}
