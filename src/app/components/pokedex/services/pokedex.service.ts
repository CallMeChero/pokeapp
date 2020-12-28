import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { IPokemonResponse } from '../../pokemon/models/response/pokemon.response';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  /* #region  Variables */
  private readonly CONTROLLER_NAME = 'pokemon';
  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _notificationService: NotificationService,
    private readonly _translate: TranslateService,
    private readonly _spinner: NgxSpinnerService
  ) {}
  /* #endregion */

  /* #region  Methods */
  //Get all
  getAll(): IPokemonResponse[] {
    const pokemons = JSON.parse(localStorage.getItem('pokedex_items'));
    return pokemons;
  }

  addToPokedex(pokemon: IPokemonResponse): void {
   let alreadyAddedPokemons = localStorage.getItem('pokedex_items');
   if(alreadyAddedPokemons) {
    let parsedPokemons = JSON.parse(alreadyAddedPokemons);
    if(parsedPokemons.some(x => x.name === pokemon.name)) {
      this._notificationService.fireWarningMessage(
        this._translate.currentLang === 'hr' ?
        `${pokemon.name} već postoji u pokedexu` :
        `${pokemon.name} already exists in pokedex`);
    } else {
      parsedPokemons.push(pokemon);
      localStorage.setItem('pokedex_items', JSON.stringify(parsedPokemons));
      this.handleAddNotification(pokemon);
    }
   } else {
     localStorage.setItem('pokedex_items', JSON.stringify([pokemon]));
     this.handleAddNotification(pokemon);
   }
  }

  delete(pokemon: IPokemonResponse): void {
    let alreadyAddedPokemons = JSON.parse(localStorage.getItem('pokedex_items'));
    localStorage.setItem('pokedex_items', JSON.stringify(alreadyAddedPokemons.filter(item => item.name !== pokemon.name)));
    this._spinner.show();
    setTimeout(() => {
      this._notificationService.fireSuccessMessage(
        this._translate.currentLang === 'hr' ?
        `${pokemon.name} je obrisan iz pokedexa` :
        `${pokemon.name} has been removed from pokedex`);
      this._spinner.hide();
    }, 2000);
  }

  handleAddNotification(pokemon: IPokemonResponse): void {
    this._spinner.show();
    // zbog izgleda
    setTimeout(() => {
      this._notificationService.fireSuccessMessage(
        this._translate.currentLang === 'hr' ?
        `${pokemon.name} je dodan u pokedex` :
        `${pokemon.name} has been added to pokedex`);
      this._spinner.hide();
    }, 2000);
  }
  /* #endregion */
}
