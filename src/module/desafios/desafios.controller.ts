import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { verificarConteudoStatus } from 'src/common/pipes/verificarStatus.pipe';
import { DesafiosService } from './desafios.service';
import { CriarDesafioDTO } from '../../dtos/desafios/criar-desafio.dto';
import {
  Desafio,
  DesafioInterface,
} from '../../interfaces/desafios/desafios.interface';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';

@Controller()
export class DesafiosController {
  constructor(private readonly desafiosServices: DesafiosService) {}

  @MessagePattern('todos-desafios')
  async obterTodosDesafios(
    @Ctx() context: RmqContext,
  ): Promise<DesafioInterface[]> {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      return await this.desafiosServices.todosDesafios();
    } catch (error) {
      throw new RpcException(error.message);
    } finally {
      await channel.ack(message);
    }
  }

  @MessagePattern('criar-desafio')
  @UsePipes(ValidationPipe)
  async cadastrarDesafios(
    @Payload() criarCategoriaDTO: CriarDesafioDTO,
    @Ctx() context: RmqContext,
  ): Promise<DesafioInterface> {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      return await this.desafiosServices.cadastrarDesafio(criarCategoriaDTO);
    } catch (error) {
      throw new RpcException(error.message);
    } finally {
      await channel.ack(message);
    }
  }

  @MessagePattern('consultar-meus-desafios')
  async obterMeusDesafios(
    @Payload() id: string,
    @Ctx() context: RmqContext,
  ): Promise<DesafioInterface[]> {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      return await this.desafiosServices.obterMeusDesafios(id);
    } catch (error) {
      throw new RpcException(error.message);
    } finally {
      await channel.ack(message);
    }
  }

  @MessagePattern('atualizar-status-desafio')
  @UsePipes(ValidationPipe)
  async atualizarStatusDesafio(
    @Payload(verificarConteudoStatus) data: [Desafio, string],
    @Ctx() context: RmqContext,
  ): Promise<string> {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      await this.desafiosServices.atualizarStatusDesafio(data[0], data[1]);
      return `O status foi atualizado para ${data[0]}`;
    } catch (error) {
    } finally {
      await channel.ack(message);
    }
  }
}
