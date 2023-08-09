import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Worker } from '../../workers/model/worker.model';
import { Customer } from '../../customer/model/customer.model';
import { WorkerService } from '../../worker-service/model/worker-service.model';

interface BookingAttr {
  worker_id: number;
  customer_id: number;
  workerService_id: number;
  payType_id: number;
  date: Date;
  start_time: Date;
  finish_time: Date;
}

@Table({ tableName: 'booking' })
export class Booking extends Model<Booking, BookingAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'booking not null worker id' })
  @ForeignKey(() => Worker)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  worker_id: number;
  @BelongsTo(() => Worker)
  worker = Worker;

  @ApiProperty({
    example: 1,
    description: 'booking not null customer id',
  })
  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customer_id: number;
  @BelongsTo(() => Customer)
  customer: Customer;

  @ApiProperty({
    example: 1,
    description: 'booking not null workerService id',
  })
  @ForeignKey(() => WorkerService)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  workerService_id: number;
  @BelongsTo(() => WorkerService)
  workerService: WorkerService;

  @ApiProperty({
    example: 1,
    description: 'booking not null payType id',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  payType_id: number;

  @ApiProperty({
    example: '2023-08-05',
    description: 'booking not null date',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @ApiProperty({
    example: '2023-08-05T10:00:00',
    description: 'booking not null start_time',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_time: Date;

  @ApiProperty({
    example: '2023-08-05T15:00:00',
    description: 'booking not null finish_time',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  finish_time: Date;
}
