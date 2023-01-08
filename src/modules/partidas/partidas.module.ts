import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaModule } from '../categorias/categoria.module';
import { DesafiosModule } from '../desafios/desafios.module';
import { JogadoresModule } from '../jogadores/jogadores.module';

import { PartidasSchema } from './interface/Partidas.Schema';
import { PartidasController } from './partidas.controller';
import { PartidasService } from './partidas.service';

@Module({
  imports: [
    DesafiosModule,
    CategoriaModule,
    JogadoresModule,
    MongooseModule.forFeature([{ name: 'Partidas', schema: PartidasSchema }]),
  ],
  controllers: [PartidasController],
  providers: [PartidasService],
})
export class PartidasModule {}
