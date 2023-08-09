import { MailService } from '../../mail/mail.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCustomerDto } from '../../customer/dto/create-customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from '../../customer/model/customer.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from './dto/customer_auth_login-auth.dto';
import { Op } from 'sequelize';
import { FindCustomerDto } from './dto/find-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer) private customerRepo: typeof Customer,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async registration(createCustomerDto: CreateCustomerDto, res: Response) {
    const customer = await this.customerRepo.findOne({
      where: { email: createCustomerDto.email },
    });
    if (customer) {
      throw new BadRequestException('Customer alerady exists!');
    }
    if (createCustomerDto.password !== createCustomerDto.password) {
      throw new BadRequestException('Password is not match!');
    }

    const hashed_password = await bcrypt.hash(createCustomerDto.password, 7);
    const newCustomer = await this.customerRepo.create({
      ...createCustomerDto,
      password: hashed_password,
    });
    const tokens = await this.getTokens(newCustomer);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();

    const updateCustomer = await this.customerRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        active_link: uniqueKey,
      },
      { where: { id: newCustomer.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    await this.mailService.sendCustomerConfirmation(updateCustomer[1][0]);

    const response = {
      message: 'Customer registerd',
      customer: updateCustomer[1][0],
      tokens,
    };
    return response;
  }

  async getTokens(customer: Customer) {
    const jwtPayload = {
      id: customer.id,
      is_active: customer.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async login(loginCustomerDto: LoginDto, res: Response) {
    const { email, password } = loginCustomerDto;
    const customer = await this.customerRepo.findOne({ where: { email } });
    if (!customer) {
      throw new UnauthorizedException('Customer not registered');
    }
    const isMatchPass = await bcrypt.compare(password, customer.password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Customer not registered(pass)');
    }
    const tokens = await this.getTokens(customer);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateCustomer = await this.customerRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: customer.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Customer logged in',
      customer: updateCustomer[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const customerData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!customerData) {
      throw new ForbiddenException('Customer not found');
    }
    const updateCustomer = await this.customerRepo.update(
      { hashed_refresh_token: null },
      { where: { id: customerData.id }, returning: true },
    );

    res.clearCookie('refresh_token');
    const response = {
      message: 'Customer logged out successfully',
      customer: updateCustomer[1][0],
    };

    return response;
  }

  async refreshToken(customer_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (customer_id != decodedToken['id']) {
      throw new BadRequestException('customer not found');
    }
    const customer = await this.customerRepo.findOne({
      where: { id: customer_id },
    });
    if (!customer || !customer.hashed_refresh_token) {
      throw new BadRequestException('customer not found');
    }

    const tokenMatch = await bcrypt.compare(refreshToken, customer.password);

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(customer);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updateCustomer = await this.customerRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: customer.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
    });

    const response = {
      message: 'Customer refreshed',
      customer: updateCustomer[1][0],
      tokens,
    };
    return response;
  }

  async findAll(findCustomerDto: FindCustomerDto) {
    const where = {};
    if (findCustomerDto.first_name) {
      where['first_name'] = {
        [Op.like]: `%{findCustomerDto.first_name}%`,
      };
    }
    if (findCustomerDto.email) {
      where['email'] = { [Op.gte]: findCustomerDto.email };
    } else if (findCustomerDto.phone_number) {
      where['phone_number'] = { [Op.gte]: findCustomerDto.phone_number };
    } else if (findCustomerDto.first_name) {
      where['first_name'] = { [Op.gte]: findCustomerDto.first_name };
    } else if (findCustomerDto.last_name) {
      where['last_name'] = { [Op.gte]: findCustomerDto.last_name };
    } else if (findCustomerDto.first_name) {
      where['first_name'] = { [Op.gte]: findCustomerDto.first_name };
    }

    const customers = await Customer.findAll({ where });
    if (!customers) {
      throw new BadRequestException('customer not found');
    }
    return customers;
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Acktivation link not found');
    }
    const updateCustomer = await this.customerRepo.update(
      { is_active: true },
      { where: { active_link: link, is_active: false }, returning: true },
    );

    if (!updateCustomer[1][0]) {
      throw new BadRequestException('Customer already actived');
    }

    const response = {
      message: 'Customer activated successfully',
      customer: updateCustomer,
    };
    return response;
  }
}
