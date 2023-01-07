import { IsEmail, IsNotEmpty } from 'class-validator';

export class CriarJogadorDTO {
  @IsNotEmpty()
  readonly telefoneCelular: string;

  @IsNotEmpty()
  readonly nome: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
