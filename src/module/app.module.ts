import { Module } from '@nestjs/common';

import * as dotenv from 'dotenv';

import { JogadoresModule } from './jogadores/jogadores.module';

import { CategoriaModule } from './categorias copy/categoria.module';

dotenv.config();
@Module({
  imports: [CategoriaModule, JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
