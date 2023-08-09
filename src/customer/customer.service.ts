import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './model/customer.model';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer)
    private customerRepo: typeof Customer,
  ) {}

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.customerRepo.create(createCustomerDto);
    return customer;
  }

  async getAllCustomers(): Promise<Customer[]> {
    const customer = await this.customerRepo.findAll({
      include: { all: true },
    });
    return customer;
  }

  async getCustomerById(id: number): Promise<Customer> {
    const customer = await this.customerRepo.findOne({
      where: { id },
    });
    return customer;
  }

  async deleteCustomerById(id: number): Promise<number> {
    return this.customerRepo.destroy({ where: { id } });
  }

  async updateCustomer(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.customerRepo.update(updateCustomerDto, {
      where: { id },
      returning: true,
    });

    return customer[1][0].dataValues;
  }

  async getCustomerByEmail(email: string) {
    const customer = await this.customerRepo.findOne({
      where: { email },
      include: { all: true },
    });
    return customer;
  }
}
