export interface PartidaInterface {
  categoria: string;
  jogadores: string[];
  resultado: Resultado;
}

export interface Resultado {
  set: string;
  ganhador: string;
}
