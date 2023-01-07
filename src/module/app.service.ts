import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from '../interfaces/categoria/categoria.schema';

@Injectable()
export class AppService {
  logger = new Logger(AppService.name);

  constructor(
    @InjectModel('Categorias') private categoriasModel: Model<Categoria>,
  ) {}

  async criarCategoria(categoria: Categoria): Promise<Categoria> {
    try {
      return await this.categoriasModel.create(categoria);
    } catch (error) {
      this.logger.error(JSON.stringify(error.message));
      throw new RpcException(error.message);
    }
  }

  async consultarCategoria(categoria: string): Promise<Categoria> {
    try {
      return await this.categoriasModel.findOne({
        categoria,
      });
    } catch (error) {
      this.logger.error(JSON.stringify(error.message));
      throw new RpcException(error.message);
    }
  }

  async todasCategorias(): Promise<Categoria[]> {
    try {
      const data = await this.categoriasModel.find();
      console.log(data[0]);
      return data;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
  async atualizarCategoria(data: any): Promise<void> {
    const encontrarCategoria = this.categoriasModel.find(data.categoria);
    console.log(encontrarCategoria);
    if (!encontrarCategoria) {
      throw new RpcException('Categoria não encontrada');
    }

    return await this.categoriasModel.findOneAndUpdate(
      { categoria: data.categoria },
      { $set: data.atualizarCategoriaDTO },
    );
  }
}
