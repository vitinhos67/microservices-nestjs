import Jogador from '../../jogadores/interface/jogadores.interface';

export interface CategoriaInterface {
  readonly categoria: string;
  descricao: string;
  eventos: Array<Eventos>;
  jogadores: Array<Jogador>;
}

export interface Eventos {
  nome: string;
  operacao: string;
  value: string;
}
