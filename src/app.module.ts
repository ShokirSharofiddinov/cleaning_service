import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { ConfigModule } from '@nestjs/config';
import { DistrictModule } from './district/district.module';
import { RegionModule } from './region/region.module';
import { Region } from './region/model/region.model';
import { District } from './district/model/district.model';
import { LocationModule } from './location/location.module';
import { Location } from './location/model/location.model';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/model/customer.model';
import { WorkersModule } from './workers/workers.module';
import { Worker } from './workers/model/worker.model';
import { BookingModule } from './booking/booking.module';
import { ServiceModule } from './service/service.module';
import { Service } from './service/model/service.model';
import { WorkerServiceModule } from './worker-service/worker-service.module';
import { WorkerService } from './worker-service/model/worker-service.model';
import { PayTypeModule } from './pay-type/pay-type.module';
import { PayType } from './pay-type/model/pay-type.model';
import { Booking } from './booking/model/booking.model';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/model/admin.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Region,
        District,
        Location,
        Customer,
        Worker,
        Service,
        WorkerService,
        PayType,
        Booking,
        Admin,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    DistrictModule,
    RegionModule,
    LocationModule,
    CustomerModule,
    WorkersModule,
    BookingModule,
    ServiceModule,
    WorkerServiceModule,
    PayTypeModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
