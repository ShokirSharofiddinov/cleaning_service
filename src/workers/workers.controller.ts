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
import { WorkerService } from './workers.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { Worker } from './model/worker.model';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { AdminSelfGuard } from '../guards/admin.self.guard';
import { WorkerSelfGuard } from '../guards/worker.self.guard';
import { WorkerGuard } from '../guards/worker.guard';

@ApiTags('Worker')
@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @ApiOperation({ summary: 'for create worker' })
  @ApiResponse({ status: 200, description: 'New worker' })
  @Post('create')
  async createWorker(@Body() createWorkerDto: CreateWorkerDto) {
    const worker = await this.workerService.createWorker(createWorkerDto);
    return worker;
  }
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'take all workeres' })
  @ApiResponse({ status: 200, description: 'get all worker' })
  @Get('all')
  async getAllWorker(): Promise<Worker[]> {
    return this.workerService.getAllWorkers();
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'take worker by id' })
  @ApiResponse({ status: 200, description: 'get worker by id' })
  @Get(':id')
  async getWorkerById(@Param('id') id: string): Promise<Worker> {
    return this.workerService.getWorkerById(+id);
  }

  @UseGuards(WorkerGuard)
  @ApiOperation({ summary: 'for delete worker' })
  @ApiResponse({ status: 200, description: 'delete worker' })
  @Delete(':id')
  async deleteWorkerById(@Param('id') id: string): Promise<number> {
    return this.workerService.deleteWorkerById(+id);
  }

  @UseGuards(WorkerGuard)
  @ApiOperation({ summary: 'for update worker' })
  @ApiResponse({ status: 200, description: 'update worker' })
  @Put(':id')
  async updateWorker(
    @Param('id') id: string,
    @Body() updateWorkerDto: UpdateWorkerDto,
  ): Promise<Worker> {
    return this.workerService.updateWorker(+id, updateWorkerDto);
  }
}
