import { Module, forwardRef } from '@nestjs/common';
import { WorkerService } from './workers.service';
import { WorkerController } from './workers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Worker } from './model/worker.model';
import { AuthModule } from '../auth/worker_auth/worker_auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Worker]),
    forwardRef(() => AuthModule),
    JwtModule.register({ global: true }),
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkersModule {}
