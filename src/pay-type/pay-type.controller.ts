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
import { PayTypeService } from './pay-type.service';
import { CreatePayTypeDto } from './dto/create-pay-type.dto';
import { PayType } from './model/pay-type.model';
import { UpdatePayTypeDto } from './dto/update-pay-type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminSelfGuard } from '../guards/admin.self.guard';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('PayType')
@Controller('payType')
export class PayTypeController {
  constructor(private readonly payTypeService: PayTypeService) {}

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'for create payType' })
  @ApiResponse({ status: 200, description: 'New payType' })
  @Post('create')
  async createPayType(@Body() createPayTypeDto: CreatePayTypeDto) {
    const payType = await this.payTypeService.createPayType(createPayTypeDto);
    return payType;
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'take all payTypees' })
  @ApiResponse({ status: 200, description: 'get all payType' })
  @Get('all')
  async getAllPayType(): Promise<PayType[]> {
    return this.payTypeService.getAllPayTypes();
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'take payTypes by id' })
  @ApiResponse({ status: 200, description: 'get payType by id' })
  @Get(':id')
  async getPayTypeById(@Param('id') id: string): Promise<PayType> {
    return this.payTypeService.getPayTypeById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'for delete payType' })
  @ApiResponse({ status: 200, description: 'delete payType' })
  @Delete(':id')
  async deletePayTypeById(@Param('id') id: string): Promise<number> {
    return this.payTypeService.deletePayTypeById(+id);
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'for update payType' })
  @ApiResponse({ status: 200, description: 'update payType' })
  @Put(':id')
  async updatePayType(
    @Param('id') id: string,
    @Body() updatePayTypeDto: UpdatePayTypeDto,
  ): Promise<PayType> {
    return this.payTypeService.updatePayType(+id, updatePayTypeDto);
  }
}
