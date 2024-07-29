import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './docs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AuthMiddleware } from './middleware/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swagger(app);
  app.enableCors();

  const jwtService = app.get(JwtService);
  app.use(new AuthMiddleware(jwtService).use);

  await app
    .listen(3001)
    .then(() => console.log('Server running on port 3001'))
    .catch((err) => console.log(err));
  app.enableShutdownHooks();
}
bootstrap();
