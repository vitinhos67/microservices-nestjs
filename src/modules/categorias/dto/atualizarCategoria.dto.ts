import { ArrayMinSize, IsOptional, IsString, IsArray } from 'class-validator';
import { Eventos } from '../interface/categoria.interface';

export class AtualizarCategoriaDTO {
  @IsString()
  @IsOptional()
  descricao: string;

  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<Eventos>;
}
