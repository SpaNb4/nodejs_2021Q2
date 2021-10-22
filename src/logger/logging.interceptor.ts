import { Injectable, ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { myLogger } from './logger';

@Injectable()
export class LoggerMiddleware implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        const { url, body, query } = request;

        myLogger.log(`${url} body=${JSON.stringify(body)} query=${JSON.stringify(query)}`);

        return next.handle().pipe(tap(() => {}));
    }
}
