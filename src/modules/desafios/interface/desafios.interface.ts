import Jogador from '../../jogadores/interface/jogadores.interface';
import { PartidaInterface } from 'src/modules/partidas/interface/Partida.interface';
export interface DesafioInterface {
  acontece: string;
  status: Desafio;
  por: Jogador; //
  para: Jogador;
  categoria: string; //
  partida?: PartidaInterface;
}

export enum Desafio {
  REALIZADA = 'REALIZADA',
  PENDENTE = 'PENDENTE',
  ACEITO = 'ACEITO',
  NEGADO = 'NEGADO',
  CANCELADO = 'CANCELADO',
  EM_ANDAMENTO = 'EM ANDAMENTO',
}
