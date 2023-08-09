import { Module } from '@nestjs/common';
import { PayTypeService } from './pay-type.service';
import { PayTypeController } from './pay-type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PayType } from './model/pay-type.model';

@Module({
  imports: [SequelizeModule.forFeature([PayType])],
  controllers: [PayTypeController],
  providers: [PayTypeService]
})
export class PayTypeModule {}
