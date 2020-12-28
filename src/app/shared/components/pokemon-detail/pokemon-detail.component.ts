import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { IPokemonDetailResponse } from '../../../components/pokemon/models/response/pokemon-detail.response';
import { IPokemonResponse } from '../../../components/pokemon/models/response/pokemon.response';
import { PokemonService } from '../../../components/pokemon/services/pokemon.service';
import { IPokemonStats } from '../../../components/pokemon/models/response/pokemon-stats.response';
import { chartColors, chartLegend, chartOptions, chartType } from 'src/app/shared/models/consts/chart-config';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'poke-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  /* #region  Variables */

  @Input() pokemon: IPokemonResponse;
  @Input() urlPokemonOverview: boolean;
  pokemonDetail!: IPokemonDetailResponse;
  public chartType = chartType;
  chartLable = [];
  chartData = [];
  chartOption = chartOptions;
  chartColor = chartColors;
  chartLegend = chartLegend;

  /* #endregion */

  /* #region  Constructor */
  constructor(
    private readonly _pokemonService: PokemonService,
    private readonly _modal: NgbActiveModal,
    private readonly _translate: TranslateService
  ) { }
  /* #endregion */

  /* #region  Methods */

  ngOnInit(): void {
    this._pokemonService.getOne(this.pokemon.url)
        .pipe(take(1)).subscribe( response => {
          console.log(response);
          this.pokemonDetail = response;
          this.mapChartData(response.stats)
        });
  }

  mapChartData(responseStats: IPokemonStats[]): void {
    responseStats.forEach(
      (item: IPokemonStats) => {
        this.chartLable.push(this._translate.instant(item.stat.name.toUpperCase()));
        this.chartData.push(item.base_stat);
      }
    )
    console.log(this.chartData, this.chartLable)
  }

  closeModal(bool: boolean): void {
    if(bool) {
      this._modal.close(this.pokemon);
    } else {
      this._modal.close(bool);
    }
  }
  /* #endregion */
}
