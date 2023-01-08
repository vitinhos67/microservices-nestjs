<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>




## Description

Utilizando o framework nest.js para criar uma aplicação com a arquitetura baseada em micro-serviços

A API ela está sendo transcrevida da API <a href='https://github.com/vitinhos67/sistema-de-jogos-nestjs'>sistemas-de-jogos-nestjs</a> apenas para ser colocada em pratica a arquitetura e adquirir conhecimentos sobre o mesmo utilizando do que é disponivel pelo nest.js.


Para rodar o projeto e necessário ter o rabbit rodando localmente ou através de um container.

caso optar por usar o docker, apenas utilize este comando:

```bash
$ docker run -d --hostname my-rabbit --name rabbit13 -p 15672:15672 -p         5672:5672 -p 25676:25676 rabbitmq:3-management
```

A senha e também o usuario são <strong>guest</strong>, por padrão.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
