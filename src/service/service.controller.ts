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
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './model/service.model';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminSelfGuard } from '../guards/admin.self.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'for create service' })
  @ApiResponse({ status: 200, description: 'New service' })
  @Post('create')
  async createService(@Body() createServiceDto: CreateServiceDto) {
    const service = await this.serviceService.createService(createServiceDto);
    return service;
  }

  @ApiOperation({ summary: 'take all servicees' })
  @ApiResponse({ status: 200, description: 'get all service' })
  @Get('all')
  async getAllService(): Promise<Service[]> {
    return this.serviceService.getAllServices();
  }

  @ApiOperation({ summary: 'take services by id' })
  @ApiResponse({ status: 200, description: 'get service by id' })
  @Get(':id')
  async getServiceById(@Param('id') id: string): Promise<Service> {
    return this.serviceService.getServiceById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'for delete service' })
  @ApiResponse({ status: 200, description: 'delete service' })
  @Delete(':id')
  async deleteServiceById(@Param('id') id: string): Promise<number> {
    return this.serviceService.deleteServiceById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'for update service' })
  @ApiResponse({ status: 200, description: 'update service' })
  @Put(':id')
  async updateService(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    return this.serviceService.updateService(+id, updateServiceDto);
  }
}
