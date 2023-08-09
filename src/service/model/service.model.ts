import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { WorkerService } from '../../worker-service/model/worker-service.model';
interface ServiceAttr {
  name: string;
}

@Table({ tableName: 'service' })
export class Service extends Model<Service, ServiceAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'window cleaner', description: 'not null name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @HasMany(() => WorkerService)
  workerService: WorkerService[];
}
