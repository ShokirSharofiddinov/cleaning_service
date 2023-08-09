import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateBookingDto } from './create-booking.dto';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @ApiProperty({
    example: 1,
    description: 'update worker id',
  })
  @IsNumber()
  worker_id?: number;

  @ApiProperty({
    example: 1,
    description: 'update customer id',
  })
  @IsNumber()
  customer_id?: number;

  @ApiProperty({
    example: 1,
    description: 'update workerService id',
  })
  @IsNumber()
  workerService_id?: number;

  @ApiProperty({
    example: 1,
    description: 'update patType id',
  })
  @IsNumber()
  payType_id?: number;

  @ApiProperty({
    example: '2023-08-05',
    description: 'update work start date',
  })
  @IsString()
  date?: Date;

  @ApiProperty({
    example: '2023-08-05T10:00:00',
    description: 'update work start time',
  })
  @IsString()
  start_time?: Date;

  @ApiProperty({
    example: '2023-08-05T15:00:00',
    description: 'update work finish time',
  })
  @IsString()
  finish_time?: Date;
}
