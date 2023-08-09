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
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './model/location.model';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminSelfGuard } from '../guards/admin.self.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({ summary: 'for create location' })
  @ApiResponse({ status: 200, description: 'New location' })
  @Post('create')
  async createLocation(@Body() createLocationDto: CreateLocationDto) {
    const location = await this.locationService.createLocation(
      createLocationDto,
    );
    return location;
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'take all locationes' })
  @ApiResponse({ status: 200, description: 'get all location' })
  @Get('all')
  async getAllLocation(): Promise<Location[]> {
    return this.locationService.getAllLocations();
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'take locations by id' })
  @ApiResponse({ status: 200, description: 'get location by id' })
  @Get(':id')
  async getLocationById(@Param('id') id: string): Promise<Location> {
    return this.locationService.getLocationById(+id);
  }

  @ApiOperation({ summary: 'for delete location' })
  @ApiResponse({ status: 200, description: 'delete location' })
  @Delete(':id')
  async deleteLocationById(@Param('id') id: string): Promise<number> {
    return this.locationService.deleteLocationById(+id);
  }

  @ApiOperation({ summary: 'for update location' })
  @ApiResponse({ status: 200, description: 'update location' })
  @Put(':id')
  async updateLocation(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    return this.locationService.updateLocation(+id, updateLocationDto);
  }
}
