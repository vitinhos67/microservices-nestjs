<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>




## Descrição

Utilizando o framework nest.js para criar uma aplicação com a arquitetura baseada em micro-serviços

A API ela está sendo transcrevida da API <a href='https://github.com/vitinhos67/sistema-de-jogos-nestjs'>sistemas-de-jogos-nestjs</a> apenas para ser colocada em pratica a arquitetura e adquirir conhecimentos sobre o mesmo utilizando do que é disponivel pelo nest.js.


Para rodar o projeto e necessário ter o rabbit rodando localmente ou através de um container.

caso optar por usar o docker, apenas utilize este comando:

```bash
$ docker run -d --hostname my-rabbit --name rabbit13 -p 15672:15672 -p         5672:5672 -p 25676:25676 rabbitmq:3-management
```

A senha e também o usuario são <strong>guest</strong>, por padrão.

## Instalação

```bash
$ npm install
```

## Rodando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
