import { Module } from '@nestjs/common';
import { WorkerServiceService } from './worker-service.service';
import { WorkerServiceController } from './worker-service.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkerService } from './model/worker-service.model';

@Module({
  imports: [SequelizeModule.forFeature([WorkerService])],
  controllers: [WorkerServiceController],
  providers: [WorkerServiceService]
})
export class WorkerServiceModule {}
