import { Module, forwardRef } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './model/customer.model';
import { AuthModule } from '../auth/customer_auth/customer_auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Customer]),
    forwardRef(() => AuthModule),
    JwtModule.register({ global: true }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
