import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './docs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swagger(app);
  app.enableCors();

  await app
    .listen(3001)
    .then(() => console.log('Server running on port 3001'))
    .catch((err) => console.log(err));
  app.enableShutdownHooks();
}

bootstrap();
