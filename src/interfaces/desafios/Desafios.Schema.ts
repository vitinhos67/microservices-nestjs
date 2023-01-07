import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Desafios {
  @Prop()
  acontece: string;

  @Prop()
  status: string;

  @Prop({
    type: Date,
    default: Date.now(),
  })
  solicitadoEm: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Jogador' })
  por: unknown;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Jogador' })
  para: unknown;

  @Prop()
  categoria: string;

  @Prop({
    type: Object,
  })
  partida: unknown;
}

export const DesafiosSchema = SchemaFactory.createForClass(Desafios);
