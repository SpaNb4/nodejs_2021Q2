import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/all-exception.filter';
import { createAdmin } from './common/create-admin';
import { morganLog, myLogger } from './logger/logger';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: myLogger,
    });
    app.use(morganLog);
    app.useGlobalFilters(new AllExceptionsFilter());
    createAdmin();
    await app.listen(process.env['PORT']!);
}
bootstrap();
