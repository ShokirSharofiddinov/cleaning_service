import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admin_auth.service';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { UpdateAdminDto } from '../../admin/dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from '../../admin/model/admin.model';
import { Response } from 'express';
import { LoginDto } from './dto/admin_auth_login-auth.dto';
import { CookieGetter } from '../../decorators/cookieGetter.decorator';
import { AdminGuard } from '../../guards/admin.guard';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminsService) {}

  @ApiOperation({ summary: 'Signup Admin' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('signup')
  signup(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.registration(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Login Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginAdminDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'logout Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Activate Admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.adminService.activate(link);
  }

  @UseGuards(AdminGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }
}
