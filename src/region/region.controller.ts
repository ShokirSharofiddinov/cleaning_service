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
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { Region } from './model/region.model';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminSelfGuard } from '../guards/admin.self.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'for create region' })
  @ApiResponse({ status: 200, description: 'New region' })
  @Post('create')
  async createRegion(@Body() createRegionDto: CreateRegionDto) {
    const region = await this.regionService.createRegion(createRegionDto);
    return region;
  }

  @ApiOperation({ summary: 'take all regiones' })
  @ApiResponse({ status: 200, description: 'get all region' })
  @Get('all')
  async getAllRegion(): Promise<Region[]> {
    return this.regionService.getAllRegions();
  }

  @ApiOperation({ summary: 'take regions by id' })
  @ApiResponse({ status: 200, description: 'get region by id' })
  @Get(':id')
  async getRegionById(@Param('id') id: string): Promise<Region> {
    return this.regionService.getRegionById(+id);
  }

  @ApiOperation({ summary: 'for delete region' })
  @ApiResponse({ status: 200, description: 'delete region' })
  @Delete(':id')
  async deleteRegionById(@Param('id') id: string): Promise<number> {
    return this.regionService.deleteRegionById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'for update region' })
  @ApiResponse({ status: 200, description: 'update region' })
  @Put(':id')
  async updateRegion(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto,
  ): Promise<Region> {
    return this.regionService.updateRegion(+id, updateRegionDto);
  }
}
