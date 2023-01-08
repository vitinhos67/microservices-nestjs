import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class Partidas {
  @Prop()
  categoria: string;

  @Prop({ type: Array })
  resultado: unknown;
}

export const PartidasSchema = SchemaFactory.createForClass(Partidas);
