import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình CORS linh hoạt
  app.enableCors({
    origin: true, // Cho phép tất cả trong quy trình phát triển
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Render thường dùng biến PORT hoặc mặc định 10000
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0'); // Listen '0.0.0.0' là bắt buộc đối với một số cloud
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
