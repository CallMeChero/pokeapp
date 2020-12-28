export interface IPokemonStats {
  base_stat;
  effort;
  stat: IPokemonStat;
}

interface IPokemonStat {
  name: string;
  url: string;
}
