import { Module } from '@nestjs/common';

import * as dotenv from 'dotenv';

import { JogadoresModule } from './jogadores/jogadores.module';

import { CategoriaModule } from './categorias/categoria.module';

import { MongooseModule } from '@nestjs/mongoose';

dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_STRING_CONNECTION),
    CategoriaModule,
    JogadoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
