import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Booking } from '../../booking/model/booking.model';

interface PayTypeAttr {
  type: string;
}

@Table({ tableName: 'payType' })
export class PayType extends Model<PayType, PayTypeAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'card', description: 'not null name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  type: string;

//   @HasMany(() => Booking)
//   booking: Booking
}
