import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './infrastructure/common/filters/exception.filter';
import { LoggerService } from './infrastructure/logger/logger.service';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import { ResponseFormat, ResponseInterceptor } from './infrastructure/common/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Filter: Log de errores o warnings.
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // Interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  // base routing
  app.setGlobalPrefix('api_v1');

  // Cors
  app.enableCors();

  // swagger config
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('CodeRender API')
    .setDescription('Proyecto backend para la clase de Sistemas Expertos')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ResponseFormat],
    deepScanRoutes: true,
  });
  SwaggerModule.setup('/', app, document);

  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
