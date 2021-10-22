import { FastifyReply } from 'fastify';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Server } from 'http';
import { myLogger } from '../logger/logger';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply<Server>>();
        const request = ctx.getRequest();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const { message } = exception;

        myLogger.error(`${status} ${message}`);
        response.status(status).send({
            statusCode: status,
            message,
            path: request.url,
        });
    }
}
