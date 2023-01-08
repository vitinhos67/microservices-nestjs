import {
  Body,
  Controller,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';

import { CriarPartidaDTO } from './dtos/criarPartidaDTO';
import { PartidasService } from './partidas.service';

@Controller()
export class PartidasController {
  constructor(private readonly partidasServices: PartidasService) {}

  @MessagePattern('todas-partidas')
  async TodasPartidas(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      return await this.partidasServices.todasPartidas();
    } catch (error) {
      throw new RpcException(error.message);
    } finally {
      channel.ack(message);
    }
  }

  @MessagePattern('criar-partida')
  @UsePipes(ValidationPipe)
  async criarPartida(
    @Body() criarPartidaDTO: CriarPartidaDTO,
    @Param('desafio_id') desafio_id: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      return await this.partidasServices.criarPartida(
        criarPartidaDTO,
        desafio_id,
      );
    } catch (error) {
      throw new RpcException(error.message);
    } finally {
      channel.ack(message);
    }
  }
}
