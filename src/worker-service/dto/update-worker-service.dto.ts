import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateWorkerServiceDto } from './create-worker-service.dto';

export class UpdateWorkerServiceDto extends PartialType(
  CreateWorkerServiceDto,
) {
  @ApiProperty({
    example: 1,
    description: 'service id update',
  })
  @IsNumber()
  service_id?: number;

  @ApiProperty({
    example: 1,
    description: 'worker id update',
  })
  @IsNumber()
  worker_id?: number;

  @ApiProperty({
    example: 250000,
    description: 'workerService price update',
  })
  @IsNumber()
  price?: number;
}
