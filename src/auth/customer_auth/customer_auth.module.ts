// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomerController } from './customer_auth.controller';
import { CustomersService } from './customer_auth.service';
import { MailModule } from '../../mail/mail.module';
import { MailService } from '../../mail/mail.service';
import { Customer } from '../../customer/model/customer.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([Customer]),
    JwtModule.register({
      secret: 'MyVeryVerySECRETKey',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    JwtModule.register({ global: true }),
    MailModule,
  ],
  controllers: [CustomerController],
  providers: [CustomersService, MailService],
  exports: [CustomersService, JwtModule],
})
export class AuthModule {}
