import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { CategoriaSchema } from '../../interfaces/categoria/categoria.schema';
import { JogadoresSchema } from '../../interfaces/jogadores/jogadores.schema';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';

dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_STRING_CONNECTION),
    MongooseModule.forFeature([
      { name: 'Categorias', schema: CategoriaSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Jogadores', schema: JogadoresSchema }]),
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [CategoriaService],
})
export class CategoriaModule {}
