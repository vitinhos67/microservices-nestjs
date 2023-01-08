import { IsNotEmpty, IsString } from 'class-validator';
import { Resultado } from '../interface/Partida.interface';

export class CriarPartidaDTO {
  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsNotEmpty()
  resultado: Resultado;
}
