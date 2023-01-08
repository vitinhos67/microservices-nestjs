import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarPartidaDTO } from './dtos/criarPartidaDTO';
import { CategoriaService } from '../categorias/categoria.service';
import { PartidaInterface } from './interface/Partida.interface';
import { JogadoresService } from '../jogadores/jogadores.service';
import { handleError } from 'src/common/utils/error.handler';
import { DesafiosService } from '../desafios/desafios.service';
import { Desafio } from '../desafios/interface/desafios.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PartidasService {
  constructor(
    @InjectModel('Partidas') private partidaModel: Model<PartidaInterface>,
    private readonly categoriaService: CategoriaService,
    private readonly jogadoresService: JogadoresService,
    private readonly desafiosService: DesafiosService,
  ) {}

  async todasPartidas() {
    return await this.partidaModel.find();
  }

  async criarPartida(criarPartidaDTO: CriarPartidaDTO, desafio_id: string) {
    const { categoria, resultado } = criarPartidaDTO;

    const encontrarDesafio = await this.desafiosService.encontrarDesafio(
      desafio_id,
    );

    const encontrarCategoria = await this.categoriaService.consultarCategoria(
      categoria,
    );

    const jogadores: string[] = [
      String(encontrarDesafio.para),
      String(encontrarDesafio.por),
    ];

    const verificarSeGanhadorEstaNoDesafio = jogadores.indexOf(
      resultado.ganhador,
    );

    if (verificarSeGanhadorEstaNoDesafio === -1) {
      throw new RpcException('O ganhador não esta no desafio');
    }

    if (!encontrarCategoria) {
      throw new RpcException('Categoria não encontrada;');
    }

    const partida: PartidaInterface = {
      categoria,
      jogadores,
      resultado: resultado,
    };

    await this.desafiosService.adicionarPartidaADesafio(desafio_id, partida);

    await this.desafiosService.atualizarStatusDesafio(
      desafio_id,
      Desafio.REALIZADA,
    );

    const criar = await this.partidaModel.create(partida).catch(handleError);

    return criar;
  }
}
