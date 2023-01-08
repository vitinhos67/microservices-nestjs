import { Injectable } from '@nestjs/common';
import { DesafioInterface, Desafio } from './interface/desafios.interface';
import { Model } from 'mongoose';
import { CriarDesafioDTO } from './dtos/criar-desafio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { JogadoresService } from '../jogadores/jogadores.service';
import { CategoriaService } from '../categorias/categoria.service';
import { handleError } from 'src/common/utils/error.handler';
import { RpcException } from '@nestjs/microservices';
import { PartidaInterface } from '../partidas/interface/Partida.interface';
@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafios')
    private DesafiosModel: Model<DesafioInterface>,
    private categoriaService: CategoriaService,
    private jogadoresService: JogadoresService,
  ) {}
  async todosDesafios(): Promise<DesafioInterface[]> {
    return await this.DesafiosModel.find();
  }
  async encontrarDesafio(id: string) {
    const desafio = await this.DesafiosModel.findById(id);

    if (!desafio) {
      throw new RpcException('O desafio não foi encontrado');
    }

    return desafio;
  }

  async cadastrarDesafio(
    CriarDesafioDTO: CriarDesafioDTO,
  ): Promise<DesafioInterface> {
    const { categoria, solicitadoPor, para, dataHoraDesafio } = CriarDesafioDTO;

    const encontrarCategoria = await this.categoriaService.consultarCategoria(
      categoria,
    );

    if (!encontrarCategoria) {
      throw new RpcException(
        `A categoria ${categoria} não foi encontrada, verifique se esta categoria está correta`,
      );
    }

    const encontrarJogador = await this.jogadoresService.consultarJogador(
      solicitadoPor,
    );

    const encontrarJogadorRequisitado =
      await this.jogadoresService.consultarJogador(para);

    if (!encontrarJogador || !encontrarJogadorRequisitado) {
      throw new RpcException('Um dos jogadores nao foi possivel encontrar');
    }

    const desafioInterface: DesafioInterface = {
      categoria,
      status: Desafio.PENDENTE,
      por: encontrarJogador,
      para: encontrarJogadorRequisitado,
      acontece: dataHoraDesafio,
    };

    const cadastrarDesafio = await this.DesafiosModel.create(desafioInterface);

    return cadastrarDesafio;
  }

  async obterMeusDesafios(id: string): Promise<DesafioInterface[]> {
    try {
      const encontrarUsuario = await this.jogadoresService.consultarJogador(id);

      if (!encontrarUsuario) {
        throw new RpcException('O jogador nao foi encontrado');
      }

      const encontrarDesafios = await this.DesafiosModel.find({
        jogadores: {
          $in: id,
        },
      });

      return encontrarDesafios;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async adicionarPartidaADesafio(id: string, partida: PartidaInterface) {
    const encontrarDesafio = await this.DesafiosModel.findById(id).catch(
      handleError,
    );

    if (!encontrarDesafio) {
      throw new RpcException('O desafio não foi encontrado');
    }

    if (encontrarDesafio.status !== Desafio.ACEITO) {
      if (encontrarDesafio.status === Desafio.REALIZADA) {
        throw new RpcException(
          'A partida já aconteceu, e não é possivel atribuir novas partidas',
        );
      }

      throw new RpcException(
        `A partida não pode ser adicionado pois o status do desafio é ${encontrarDesafio.status}`,
      );
    }

    const adicionarDesafio = await this.DesafiosModel.findByIdAndUpdate(id, {
      $push: {
        partida,
      },
    });

    return adicionarDesafio;
  }

  async atualizarStatusDesafio(status: string, id: string) {
    const atualizarStatus = await this.DesafiosModel.findByIdAndUpdate(id, {
      $set: {
        status,
      },
    }).catch(handleError);

    if (!atualizarStatus) {
      throw new RpcException('O desafio não foi encontrado');
    }

    return atualizarStatus;
  }
}
