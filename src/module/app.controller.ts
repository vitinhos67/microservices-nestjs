import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';

import { AppService } from './app.service';
import { Categoria } from '../interfaces/categoria/categoria.schema';

const ackErrors: string[] = ['E11000'];

@Controller()
export class AppController {
  logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @EventPattern('criar-categoria')
  async criarCategoria(
    @Payload() categoria: Categoria,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      await this.appService.criarCategoria(categoria);
      await channel.ack(message);
    } catch (error) {
      this.logger.error(JSON.stringify(error.message));

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
