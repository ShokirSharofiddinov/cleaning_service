// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from './admin_auth.controller';
import { AdminsService } from './admin_auth.service';
import { MailModule } from '../../mail/mail.module';
import { MailService } from '../../mail/mail.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from '../../admin/model/admin.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin]),
    JwtModule.register({
      secret: 'MyVeryVerySECRETKey',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    JwtModule.register({ global: true }),
    MailModule,
  ],
  controllers: [AdminController],
  providers: [AdminsService, MailService],
  exports: [AdminsService, JwtModule],
})
export class AuthModule {}
