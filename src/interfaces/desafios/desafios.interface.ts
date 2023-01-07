import Jogador from '../jogadores/jogadores.interface';

export interface DesafioInterface {
  acontece: string;
  status: Desafio;
  por: Jogador; //
  para: Jogador;
  categoria: string; //
  partida?: PartidaInterface;
}
export interface PartidaInterface {
  categoria: string;
  jogadores: [];
  resultado: Resultado[];
}

type Resultado = {
  set: string;
  ganhador: string;
};

export enum Desafio {
  REALIZADA = 'REALIZADA',
  PENDENTE = 'PENDENTE',
  ACEITO = 'ACEITO',
  NEGADO = 'NEGADO',
  CANCELADO = 'CANCELADO',
  EM_ANDAMENTO = 'EM ANDAMENTO',
}
