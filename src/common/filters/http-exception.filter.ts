import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message:
        typeof message === 'string'
          ? message
          : (message as { message?: string }).message || 'Something went wrong',
    };

    // Log según el ambiente y tipo de error
    const isProduction = process.env.NODE_ENV === 'production';
    const isClientError = status >= 400 && status < 500;

    if (isClientError) {
      // Errores de cliente (4xx): Log simple sin stack trace
      this.logger.warn(
        `${request.method} ${request.url} - Status: ${status} - ${JSON.stringify(errorResponse.message)}`,
      );
    } else {
      // Errores de servidor (5xx): Log con stack trace
      this.logger.error(
        `${request.method} ${request.url} - Status: ${status} - ${JSON.stringify(errorResponse.message)}`,
        isProduction ? '' : exception instanceof Error ? exception.stack : '',
      );
    }

    response.status(status).json(errorResponse);
  }
}
