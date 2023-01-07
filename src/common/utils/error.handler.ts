import { RpcException } from '@nestjs/microservices';

export const handleError = (error: Error): void => {
  const errorLines = error.message?.split('\n');
  const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

  if (!lastErrorLine) {
    console.error(error);
  }

  throw new RpcException(lastErrorLine || 'Ocorreu um erro inesperado.');
};
