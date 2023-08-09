import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { WorkersService } from './worker_auth.service';
import { CreateWorkerDto } from '../../workers/dto/create-worker.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { Worker } from '../../workers/model/worker.model';
import { LoginDto } from './dto/worker_auth_login-auth.dto'
import { CookieGetter } from '../../decorators/cookieGetter.decorator';
import { WorkerGuard } from '../../guards/worker.guard';

@Controller('worker')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @ApiOperation({ summary: 'register Worker' })
  @ApiResponse({ status: 201, type: Worker })
  @Post('signup')
  registration(
    @Body() createWorkerDto: CreateWorkerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workersService.registration(createWorkerDto, res);
  }

  @ApiOperation({ summary: 'Login Worker' })
  @ApiResponse({ status: 200, type: Worker })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginWorkerDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workersService.login(loginWorkerDto, res);
  }

  @UseGuards(WorkerGuard)
  @ApiOperation({ summary: 'logout Worker' })
  @ApiResponse({ status: 200, type: Worker })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workersService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'activate worker' })
  @ApiResponse({ status: 200, type: Worker })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.workersService.activate(link);
  }

  @UseGuards(WorkerGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workersService.refreshToken(+id, refreshToken, res);
  }
}
