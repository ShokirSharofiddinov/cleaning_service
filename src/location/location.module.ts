import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Location } from './model/location.model';

@Module({
  imports: [SequelizeModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationModule {}
