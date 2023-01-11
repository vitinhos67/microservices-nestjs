import { PartidaInterface } from './Partida.interface';
export interface DesafioInterface {
  acontece: string;
  status: DesafioStatus;
  por: object; //
  para: object;
  categoria: string; //
  partida?: PartidaInterface;
}

export enum DesafioStatus {
  REALIZADA = 'REALIZADA',
  PENDENTE = 'PENDENTE',
  ACEITO = 'ACEITO',
  NEGADO = 'NEGADO',
  CANCELADO = 'CANCELADO',
  EM_ANDAMENTO = 'EM ANDAMENTO',
}
