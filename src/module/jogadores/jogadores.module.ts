import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresSchema } from 'src/interfaces/jogadores/jogadores.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Jogadores', schema: JogadoresSchema }]),
  ],
  providers: [JogadoresService],
  controllers: [JogadoresController],
})
export class JogadoresModule {}
