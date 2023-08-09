import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWorkerServiceDto {
  @ApiProperty({
    example: 1,
    description: 'service id',
  })
  @IsNumber()
  @IsNotEmpty()
  service_id: number;

  @ApiProperty({
    example: 1,
    description: 'worker id',
  })
  @IsNumber()
  @IsNotEmpty()
  worker_id: number;

  @ApiProperty({
    example: 250000,
    description: 'workerService price',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
