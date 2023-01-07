import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Jogador from 'src/interfaces/jogadores/jogadores.interface';
import { Jogadores } from 'src/interfaces/jogadores/jogadores.schema';
import { CriarJogadorDTO } from 'src/dtos/jogadores/criarJogador.dto';
import { AtualizarJogadorDTO } from 'src/dtos/jogadores/atualizarJogador.dto';
@Injectable()
export class JogadoresService {
  logger = new Logger(JogadoresService.name);
  codeErrors: string[];
  constructor(
    @InjectModel('Jogadores') private jogadoresModel: Model<Jogadores>,
  ) {
    this.codeErrors = ['E11000'];
  }

  async consultadorTodosJogadores() {
    try {
      return await this.jogadoresModel.find();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async consultarJogador(id: string) {
    try {
      return await this.jogadoresModel.findById(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async criarJogador(criarJogadorDTO: CriarJogadorDTO) {
    const { nome, telefoneCelular, email } = criarJogadorDTO;

    await this.verificarSeEmailEstaEmUso(email);

    const jogador: Jogador = {
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'https://www.google.com.br/foto123.png',
    };

    const salvarJogador = await this.jogadoresModel
      .create(jogador)
      .catch((e) => {
        if (e) {
          throw new RpcException(e.message);
        }
      });

    this.logger.log(`CriaJogadorDTO: ${JSON.stringify(jogador)}`);

    return salvarJogador;
  }

  async verificarSeEmailEstaEmUso(email: string) {
    const jogadorEncontrado = await this.jogadoresModel.findOne({
      email,
    });

    if (jogadorEncontrado) {
      throw new RpcException(`Email Já esta em uso`);
    }
  }

  async atualizarJogador(
    id: string,
    atualizarJogadorDto: AtualizarJogadorDTO,
  ): Promise<Jogador> {
    const jogador = await this.consultarJogador(id);

    if (!jogador) {
      throw new RpcException(`Jogador com o id ${id} não encontrado`);
    }

    const atualizarJogador = await this.jogadoresModel
      .findByIdAndUpdate(id, atualizarJogadorDto)
      .catch((error) => {
        console.log(error.message);
        if (error.message.includes(this.codeErrors)) {
          throw new RpcException('Email já está sendo utilizado');
        }

        throw new RpcException(error.message);
      });

    return atualizarJogador;
  }
}
