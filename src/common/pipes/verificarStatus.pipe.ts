import { BadRequestException, PipeTransform } from '@nestjs/common';
import { DesafioStatus } from 'src/interfaces/Desafio.interface';

export class verificarConteudoStatus implements PipeTransform {
  transform(value: any) {
    /***
     *  @param {value} any  O tipo de value e um array em que contem duas priopridades,
     * sendo elas, respectivamente, O enum Desafio e uma string com o id do desafio
     */

    value[0] = value[0].toUpperCase(); // Capitaliza todas as letras

    const status = Object.values(DesafioStatus);
    const verificarSeKeyExiste = status.find(
      (statusKeys) => statusKeys === value[0],
    ); // Verifica se a letra contem no enum Desafio, Se não, e uma palavra impropia e retorna um erro

    if (!verificarSeKeyExiste) {
      throw new BadRequestException(`O valor ${value} não e aceito`);
    } //faz a vericação

    return value;
  }
}
