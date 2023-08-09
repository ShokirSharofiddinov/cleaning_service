// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { WorkersController } from './worker_auth.controller';
import { WorkersService } from './worker_auth.service';
import { MailModule } from '../../mail/mail.module';
import { MailService } from '../../mail/mail.service';
import { Worker } from '../../workers/model/worker.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([Worker]),
    JwtModule.register({
      secret: 'MyVeryVerySECRETKey',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    JwtModule.register({ global: true }),
    MailModule,
  ],
  controllers: [WorkersController],
  providers: [WorkersService, MailService],
  exports: [WorkersService, JwtModule],
})
export class AuthModule {}
