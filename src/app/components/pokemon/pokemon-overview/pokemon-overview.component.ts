import { AfterViewInit, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IPokemonResponse } from '../models/response/pokemon.response';
import { NgxSpinnerService } from 'ngx-spinner';
import { PokemonService } from '../services/pokemon.service';
import { catchError,take } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { PageInfo } from 'src/app/shared/models/pagination/page-info';
import { IBasePagination } from 'src/app/shared/models/pagination/base-pagination';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { CUSTOM_DATATABLE_ICONS, IDatatableIcons } from 'src/app/shared/models/consts/datatable-icon.const';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

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
     private _spinner: NgxSpinnerService,
     private _pokemonService: PokemonService
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
        console.log(res)
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
    });
    modal.result
      .then((result) => {
        if (result && result.id) {
          this._pokemonService
            .put(result)
            .pipe(
              take(1),
              catchError((err) => this.catchAndReplaceError(err))
            )
            .subscribe((data) => {
              this.handleSuccesResponse('Pokemon je uređen');
            });
        } else {
          this._pokemonService
            .add(result)
            .pipe(
              take(1),
              catchError((err) => this.catchAndReplaceError(err))
            )
            .subscribe((data) => {
              this.handleSuccesResponse('Pokemon je dodan');
            });
        }
      })
      .catch((reason) => {
        if (pokemon) {
          this.handleModalDismiss('Pokemon nije uređen');
        } else {
          this.handleModalDismiss('Pokemon nije dodan');
        }
        // todo swift alert warning
      });
  }

  // 201 - Success
  handleSuccesResponse(successMessage: string): void {
    this._spinner.show();
    // zbog izgleda
    setTimeout(() => {
      this._spinner.hide();
      this._notificationService.fireSuccessMessage(successMessage);
      this.getPokemons();
    }, 500);
  }

  // Error handling
  catchAndReplaceError(errorMessage: string): Observable<never> {
    this._notificationService.fireErrorNotification(errorMessage);
    return EMPTY;
  }

  // Ngb modal dismiss event
  handleModalDismiss(message: string): void {
    this._notificationService.fireWarningMessage(message);
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
