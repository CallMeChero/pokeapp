import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IBasePagination } from 'src/app/shared/models/pagination/base-pagination';
import { UrlHelperService } from 'src/app/shared/services/url-helper.service';
import { IPokemonResponse } from '../models/response/pokemon.response';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  /* #region  Variables */
  private readonly CONTROLLER_NAME = 'pokemon';
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _http: HttpClient,
    private readonly _urlHelper: UrlHelperService
  ) {}

  //Get All Dropdown
  getPaginated(limit: number, offset: number): Observable<IBasePagination<IPokemonResponse>> {
    const url = this._urlHelper.getUrl(this.CONTROLLER_NAME);
    const requestParams = this._urlHelper.getQueryParameters({limit,offset});
    console.log(url);
    console.log(requestParams)
    return this._http
      .get<IBasePagination<IPokemonResponse>>(url,{ params: requestParams })
      .pipe(
        tap((data) => console.log('Get all pokemons', data)),
        catchError(this.handleError)
      );
  }

  add(formGroup: IPokemonResponse): Observable<any> {
    const request = { ...formGroup };
    const url = this._urlHelper.getUrl(this.CONTROLLER_NAME);
    return this._http
      .post<Observable<any>>(url.toString(), request)
      .pipe(
        tap((data) => console.log('Add bank', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  put(formGroup: IPokemonResponse): Observable<any> {
    const request = { ...formGroup };
    const url = this._urlHelper.getUrl(this.CONTROLLER_NAME);
    return this._http
      .put<Observable<any>>(url.toString(), request)
      .pipe(
        tap((data) => console.log('Add bank', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<any> {
    const url = this._urlHelper.getUrl(this.CONTROLLER_NAME);
    return this._http
      .delete<Observable<any>>(url.toString())
      .pipe(
        tap((data) => console.log('Delete bank', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // Remove before production
  private handleError(err: HttpErrorResponse): Observable<never> {
    const { error } = err;
    // instead of logging infrastructore on BE, just log it to the console
    let errorMessage: string;
    if (error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `Došlo je do frontend pogreške: ${error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }
}