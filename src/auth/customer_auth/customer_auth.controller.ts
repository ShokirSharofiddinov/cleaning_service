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
import { CustomersService } from './customer_auth.service';
import { CreateCustomerDto } from '../../customer/dto/create-customer.dto';
import { UpdateCustomerDto } from '../../customer/dto/update-customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Customer } from '../../customer/model/customer.model';
import { Response } from 'express';
import { LoginDto } from './dto/customer_auth_login-auth.dto';
import { CookieGetter } from '../../decorators/cookieGetter.decorator';
import { CustomerGuard } from '../../guards/customer.guard';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomersService) {}

  @ApiOperation({ summary: 'Signup Customer' })
  @ApiResponse({ status: 201, type: Customer })
  @Post('signup')
  signup(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.registration(createCustomerDto, res);
  }

  @ApiOperation({ summary: 'Login Customer' })
  @ApiResponse({ status: 200, type: Customer })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginCustomerDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.login(loginCustomerDto, res);
  }

  @ApiOperation({ summary: 'logout Customer' })
  @ApiResponse({ status: 200, type: Customer })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Activate Customer' })
  @ApiResponse({ status: 200, type: [Customer] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.customerService.activate(link);
  }

  @UseGuards(CustomerGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.refreshToken(+id, refreshToken, res);
  }
}
