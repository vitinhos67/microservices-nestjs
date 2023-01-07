import { IsNotEmpty, IsString } from 'class-validator';

export class CriarDesafioDTO {
  @IsString()
  @IsNotEmpty()
  solicitadoPor: string;

  @IsString()
  @IsNotEmpty()
  para: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsString()
  @IsNotEmpty()
  dataHoraDesafio: string;
}
