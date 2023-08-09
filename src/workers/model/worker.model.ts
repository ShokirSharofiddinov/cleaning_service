import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany
} from 'sequelize-typescript';
import { Location } from '../../location/model/location.model';
import { WorkerService } from '../../worker-service/model/worker-service.model';
import { Booking } from '../../booking/model/booking.model';

interface WorkerAttr {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mark: number;
  is_active: boolean;
  location_id: number;
  phone_number: string;
  gender: string;
  active_link: string;
  hashed_refresh_token: string;
}

@Table({ tableName: 'worker' })
export class Worker extends Model<Worker, WorkerAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John', description: 'Worker not null first name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Worker not null last name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({
    example: 'worker@gmail.com',
    description: 'Worker email',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'Poilkjmnb098',
    description: 'Worker password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: 4.5,
    description: 'Worker mark (max 5)',
  })
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    defaultValue: 3.5,
  })
  mark: number;

  @ApiProperty({
    example: true,
    description: 'Worker is active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ForeignKey(() => Location)
  @ApiProperty({
    example: 1,
    description: 'Worker location id',
  })
  @Column({
    type: DataType.INTEGER,
  })
  location_id: number;
  @BelongsTo(() => Location)
  location: Location;

  @ApiProperty({
    example: '+998991234567',
    description: 'Worker phone_number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @ApiProperty({
    example: 'Male',
    description: 'Worker gender',
  })
  @Column({
    type: DataType.STRING,
  })
  gender: string;

  @ApiProperty({ example: 'token', description: 'Foydalanuvchi tokeni' })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  active_link: string;

  @HasMany(() => Booking)
  booking: Booking[];

  @HasMany(() => WorkerService)
  workerService: WorkerService[];
}
