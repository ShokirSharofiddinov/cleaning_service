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
import { Location } from '../../location/model/location.model';

interface DistrictAttr {
  name: string;
  region_id: number;
}

@Table({ tableName: 'district' })
export class District extends Model<District, DistrictAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Qator tol', description: 'not null name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @ApiProperty({ example: 1, description: 'region id' })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;
  @BelongsTo(() => Region)
  region: Region;

  @HasMany(() => Location)
  location: Location[];
}
