import { Module, forwardRef } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './model/admin.model';
import { AuthModule } from '../auth/admin_auth/admin_auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Admin]),
    forwardRef(() => AuthModule),
    JwtModule.register({ global: true }),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}