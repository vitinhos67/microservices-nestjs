import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoriaDocument = HydratedDocument<Categoria>;

@Schema()
export class Categoria {
  @Prop({
    unique: true,
  })
  categoria: string;

  @Prop()
  descricao: string;

  @Prop([
    {
      nome: String,
      operacao: String,
      valor: Number,
    },
  ])
  eventos: [];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'jogador',
    },
  ])
  jogadores: [];
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
