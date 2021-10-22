import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import dotenv from 'dotenv';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/all-exception.filter';
import { createAdmin } from './common/create-admin';
import { myLogger } from './logger/logger';
import { LoggerMiddleware } from './logger/logging.interceptor';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(
        AppModule,
        process.env['USE_FASTIFY'] === 'true' ? new FastifyAdapter() : new ExpressAdapter(),
        {
            logger: myLogger,
        }
    );
    app.useGlobalInterceptors(new LoggerMiddleware());
    app.useGlobalFilters(new AllExceptionsFilter());
    createAdmin();
    await app.listen(process.env['PORT']!, '0.0.0.0');
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
