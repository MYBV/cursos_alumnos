//###########################################################################################
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
//###########################################################################################

//###########################################################################################
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter()); //Maneja Excepciones
  app.useGlobalInterceptors(new TimeOutInterceptor()); //Timeout de peticiones
  app.useGlobalPipes(new ValidationPipe());

  let options = new DocumentBuilder()
    .setTitle('Courses Students API')
    .setDescription('API for scheduled course')
    .setVersion('1.0.0.0')
    .addBearerAuth()
    .build();

  let document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });

  await app.listen(process.env.PORT || 5000);
}
//###########################################################################################

//###########################################################################################
bootstrap();
//###########################################################################################
