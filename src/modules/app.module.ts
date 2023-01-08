import { Module } from '@nestjs/common';

import * as dotenv from 'dotenv';

import { JogadoresModule } from './jogadores/jogadores.module';

import { CategoriaModule } from './categorias/categoria.module';
import { DesafiosController } from './desafios/desafios.controller';
import { DesafiosModule } from './desafios/desafios.module';
import { PartidasModule } from './partidas/partidas.module';

dotenv.config();
@Module({
  imports: [CategoriaModule, JogadoresModule, DesafiosModule, PartidasModule],
  controllers: [DesafiosController],
  providers: [],
})
export class AppModule {}
