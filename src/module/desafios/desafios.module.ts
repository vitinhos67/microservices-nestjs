import { Module } from '@nestjs/common';
import { DesafiosController } from './desafios.controller';
import { DesafiosService } from './desafios.service';

import { MongooseModule } from '@nestjs/mongoose';
import { DesafiosSchema } from 'src/interfaces/desafios/Desafios.Schema';
import { JogadoresModule } from '../jogadores/jogadores.module';
import { CategoriaModule } from '../categorias/categoria.module';

@Module({
  imports: [
    JogadoresModule,
    CategoriaModule,
    MongooseModule.forFeature([{ name: 'Desafios', schema: DesafiosSchema }]),
  ],
  controllers: [DesafiosController],
  providers: [DesafiosService],
  exports: [DesafiosService],
})
export class DesafiosModule {}
