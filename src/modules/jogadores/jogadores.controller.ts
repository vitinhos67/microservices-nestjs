import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';

import { CriarJogadorDTO } from 'src/modules/jogadores/dtos/criarJogador.dto';
import { JogadoresService } from './jogadores.service';

@Controller('/api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @EventPattern('consultar-todos-jogadores')
  async consultarTodosJogadores(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      return await this.jogadoresService.consultadorTodosJogadores();
    } catch (error) {
      throw new RpcException(error.message);
    } finally {
      await channel.ack(message);
    }
  }

  @EventPattern('consultar-jogador')
  async consultarJogador(
    @Payload('id') id: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      return await this.jogadoresService.consultarJogador(id);
    } catch (error) {
      throw new RpcException(error.message);
    } finally {
      await channel.ack(message);
    }
  }

  @EventPattern('criar-jogador')
  async criarJogador(
    @Payload() criarJogadorDTO: CriarJogadorDTO,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      return this.jogadoresService.criarJogador(criarJogadorDTO);
    } catch (error) {
      throw new RpcException(error.message);
    } finally {
      await channel.ack(message);
    }
  }

  @EventPattern('atualizar-jogador')
  async atualizarJogador(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      const { atualizarJogador, id } = data;
      return this.jogadoresService.atualizarJogador(id, atualizarJogador);
    } catch (error) {
      throw new RpcException(error.message);
    } finally {
      channel.ack(message);
    }
  }
}
