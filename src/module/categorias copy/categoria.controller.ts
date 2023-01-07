import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';

import { CategoriaService } from './categoria.service';
import { Categoria } from '../../interfaces/categoria/categoria.schema';

const ackErrors: string[] = ['E11000'];

@Controller()
export class CategoriaController {
  logger = new Logger(CategoriaController.name);

  constructor(private readonly appService: CategoriaService) {}

  @MessagePattern('criar-categoria')
  async criarCategoria(
    @Payload() categoria: Categoria,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      const criarCategoria = this.appService.criarCategoria(categoria);
      await channel.ack(message);

      return criarCategoria;
    } catch (error) {
      const filter = ackErrors.filter(async (ackErrors) =>
        error.message.includes(ackErrors),
      );

      if (filter) {
        await channel.ack(message);
      }
    }
  }

  @MessagePattern('consultar-todas-categorias')
  async TodasCategoria(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      return this.appService.todasCategorias();
    } catch (error) {
      this.logger.error(JSON.stringify(error.message));
    } finally {
      await channel.ack(message);
    }
  }

  @MessagePattern('consultar-categoria')
  async consultarCategoria(
    @Payload() categoria: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      return await this.appService.consultarCategoria(categoria);
    } catch (error) {
      this.logger.error(JSON.stringify(error.message));
    } finally {
      await channel.ack(message);
    }
  }

  @MessagePattern('atualizar-categoria')
  async atualizarCategoria(@Payload() data: any, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();

    try {
      return await this.appService.atualizarCategoria(data);
    } catch (error) {
      throw new RpcException(error.message);
    } finally {
      channel.ack(message);
    }
  }
}
