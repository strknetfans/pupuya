import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from './config';
import { HttpExceptionFilter } from './core/http-exception.filter';

const { swagger } = config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger Api
  if (swagger.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swagger.title || 'Nestjs')
      .setDescription(swagger.description || 'The nestjs API description')
      .setVersion(swagger.version || '1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swagger.path || 'api', app, document);
  }

  // 注册全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
