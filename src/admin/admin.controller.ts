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
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './model/admin.model';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminSelfGuard } from '../guards/admin.self.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'for create admin' })
  @ApiResponse({ status: 200, description: 'New admin' })
  @Post('create')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    const admin = await this.adminService.createAdmin(createAdminDto);
    return admin;
  }


  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'take all admines' })
  @ApiResponse({ status: 200, description: 'get all admin' })
  @Get('all')
  async getAllAdmin(): Promise<Admin[]> {
    return this.adminService.getAllAdmins();
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'take admins by id' })
  @ApiResponse({ status: 200, description: 'get admin by id' })
  @Get(':id')
  async getAdminById(@Param('id') id: string): Promise<Admin> {
    return this.adminService.getAdminById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'for delete admin' })
  @ApiResponse({ status: 200, description: 'delete admin' })
  @Delete(':id')
  async deleteAdminById(@Param('id') id: string): Promise<number> {
    return this.adminService.deleteAdminById(+id);
  }

  @UseGuards(AdminSelfGuard)
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'for update admin' })
  @ApiResponse({ status: 200, description: 'update admin' })
  @Put(':id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    return this.adminService.updateAdmin(+id, updateAdminDto);
  }
}
