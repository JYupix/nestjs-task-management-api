import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Check API health status' })
  @ApiResponse({
    status: 200,
    description: 'API is healthy',
    schema: {
      example: {
        status: 'ok',
        timestamp: '2026-01-09T17:30:00.000Z',
        uptime: 123.45,
        database: 'connected',
      },
    },
  })
  @ApiResponse({ status: 503, description: 'Service unavailable' })
  check() {
    return this.healthService.check();
  }
}
