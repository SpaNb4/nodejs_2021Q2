import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/all-exception.filter';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.listen(process.env['PORT']!);
}
bootstrap();
