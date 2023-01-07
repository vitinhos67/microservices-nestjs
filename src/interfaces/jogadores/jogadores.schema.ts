import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JogadoresDocument = HydratedDocument<Jogadores>;

@Schema()
export class Jogadores {
  @Prop({
    unique: true,
  })
  telefoneCelular: string;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  nome: string;

  @Prop()
  ranking: string;

  @Prop()
  posicaoRanking: number;

  @Prop()
  urlFotoJogador: string;
}

export const JogadoresSchema = SchemaFactory.createForClass(Jogadores);
