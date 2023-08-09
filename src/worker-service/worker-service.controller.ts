import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { WorkerServiceService } from './worker-service.service';
import { CreateWorkerServiceDto } from './dto/create-worker-service.dto';
import { WorkerService } from './model/worker-service.model';
import { UpdateWorkerServiceDto } from './dto/update-worker-service.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminSelfGuard } from '../guards/admin.self.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('WorkerService')
@Controller('workerService')
export class WorkerServiceController {
  constructor(private readonly workerServiceService: WorkerServiceService) {}

  @ApiOperation({ summary: 'for create workerService' })
  @ApiResponse({ status: 200, description: 'New workerService' })
  @Post('create')
  async createWorkerService(
    @Body() createWorkerServiceDto: CreateWorkerServiceDto,
  ) {
    const workerService = await this.workerServiceService.createWorkerService(
      createWorkerServiceDto,
    );
    return workerService;
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'take all workerServicees' })
  @ApiResponse({ status: 200, description: 'get all workerService' })
  @Get('all')
  async getAllWorkerService(): Promise<WorkerService[]> {
    return this.workerServiceService.getAllWorkerServices();
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'take workerServices by id' })
  @ApiResponse({ status: 200, description: 'get workerService by id' })
  @Get(':id')
  async getWorkerServiceById(@Param('id') id: string): Promise<WorkerService> {
    return this.workerServiceService.getWorkerServiceById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'for delete workerService' })
  @ApiResponse({ status: 200, description: 'delete workerService' })
  @Delete(':id')
  async deleteWorkerServiceById(@Param('id') id: string): Promise<number> {
    return this.workerServiceService.deleteWorkerServiceById(+id);
  }

  @ApiOperation({ summary: 'for update workerService' })
  @ApiResponse({ status: 200, description: 'update workerService' })
  @Put(':id')
  async updateWorkerService(
    @Param('id') id: string,
    @Body() updateWorkerServiceDto: UpdateWorkerServiceDto,
  ): Promise<WorkerService> {
    return this.workerServiceService.updateWorkerService(
      +id,
      updateWorkerServiceDto,
    );
  }
}
