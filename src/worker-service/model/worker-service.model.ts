import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Service } from '../../service/model/service.model';
import { Worker } from '../../workers/model/worker.model';

interface WorkerServiceAttr {
  service_id: number;
  worker_id: number;
  price: number;
}

@Table({ tableName: 'workerService' })
export class WorkerService extends Model<WorkerService, WorkerServiceAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'workerService not null service id' })
  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  service_id: number;
  @BelongsTo(() => Service)
  service: Service

  @ApiProperty({ example: 1, description: 'workerService not null worker id' })
  @ForeignKey(() => Worker)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  worker_id: number;
  @BelongsTo(() => Worker)
  worker: Worker

  @ApiProperty({example: 250000, description: 'workerService not null price'})
  @Column({
    type: DataType.DECIMAL
  })
  price: number
}
