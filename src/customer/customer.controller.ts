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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './model/customer.model';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminSelfGuard } from '../guards/admin.self.guard';
import { AdminGuard } from '../guards/admin.guard';
import { CustomerGuard } from '../guards/customer.guard';
import { CustomerSelfGuard } from '../guards/customer.self.guard';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'for create customer' })
  @ApiResponse({ status: 200, description: 'New customer' })
  @Post('create')
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerService.createCustomer(
      createCustomerDto,
    );
    return customer;
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'take all customeres' })
  @ApiResponse({ status: 200, description: 'get all customer' })
  @Get('all')
  async getAllCustomer(): Promise<Customer[]> {
    return this.customerService.getAllCustomers();
  }

  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'take customers by id' })
  @ApiResponse({ status: 200, description: 'get customer by id' })
  @Get(':id')
  async getCustomerById(@Param('id') id: string): Promise<Customer> {
    return this.customerService.getCustomerById(+id);
  }

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'for delete customer' })
  @ApiResponse({ status: 200, description: 'delete customer' })
  @Delete(':id')
  async deleteCustomerById(@Param('id') id: string): Promise<number> {
    return this.customerService.deleteCustomerById(+id);
  }

  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'for update customer' })
  @ApiResponse({ status: 200, description: 'update customer' })
  @Put(':id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.updateCustomer(+id, updateCustomerDto);
  }
}
