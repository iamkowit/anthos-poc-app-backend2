import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: 'calculator',
      protoPath: [join(__dirname, '../api/proto/v1/calculator.proto')],
    },
  });
  await app.startAllMicroservicesAsync()
  await app.listen(3000);
}

bootstrap();
