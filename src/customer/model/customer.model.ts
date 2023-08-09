import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Location } from '../../location/model/location.model';
import { Booking } from '../../booking/model/booking.model';

interface CustomerAttr {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  is_active: boolean;
  email: string;
  location_id: number;
  phone_number: string;
  active_link: string;
  hashed_refresh_token: string;
}

@Table({ tableName: 'customer' })
export class Customer extends Model<Customer, CustomerAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John', description: 'customer not null first name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({
    example: 'lastName',
    description: 'customer not null last_name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({
    example: 'UsErNaMe',
    description: 'customer not null user name',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @ApiProperty({
    example: 'Poilkjmnb098',
    description: 'customer not null password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: false,
    description: 'customer is active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'eamil@email.com',
    description: 'customer email',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 1,
    description: 'customer location id',
  })
  @ForeignKey(() => Location)
  @Column({
    type: DataType.INTEGER,
  })
  location_id: number;

  @BelongsTo(() => Location)
  location: Location;

  @ApiProperty({
    example: '+9981234657',
    description: 'customer phone_number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

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
}
