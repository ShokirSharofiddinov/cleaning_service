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
import { Region } from '../../region/model/region.model';
import { District } from '../../district/model/district.model';
import { Customer } from '../../customer/model/customer.model';
import { Worker } from '../../workers/model/worker.model';

interface LocationAttr {
  home_number: number;
  region_id: number;
  district_id: number;
  street_name: string;
}

@Table({ tableName: 'location' })
export class Location extends Model<Location, LocationAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 7, description: 'home number' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  home_number: number;

  @ApiProperty({ example: 1, description: 'region id' })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  region_id: number;
  @BelongsTo(() => Region)
  region: Region;

  @ApiProperty({ example: 1, description: 'district id' })
  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  district_id: number;
  @BelongsTo(() => District)
  district: District;

  @ApiProperty({ example: 'streetName', description: 'street_name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street_name: string;

  @HasMany(() => Customer)
  customer: Customer[];

  @HasMany(() => Worker)
  worker: Worker[];
}
