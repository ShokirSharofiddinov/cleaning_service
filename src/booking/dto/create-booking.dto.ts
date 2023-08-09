import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBookingDto {
  @ApiProperty({
    example: 1,
    description: 'worker id',
  })
  @IsNumber()
  @IsNotEmpty()
  worker_id: number;

  @ApiProperty({
    example: 1,
    description: 'customer id',
  })
  @IsNumber()
  @IsNotEmpty()
  customer_id: number;

  @ApiProperty({
    example: 1,
    description: 'workerService id',
  })
  @IsNumber()
  @IsNotEmpty()
  workerService_id: number;

  @ApiProperty({
    example: 1,
    description: 'patType id',
  })
  @IsNumber()
  @IsNotEmpty()
  payType_id: number;

  @ApiProperty({
    example: '2023-08-05',
    description: 'work start date',
  })
  @IsString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    example: '2023-08-05T10:00:00',
    description: 'work start time',
  })
  @IsString()
  @IsNotEmpty()
  start_time: Date;

  @ApiProperty({
    example: '2023-08-05T15:00:00',
    description: 'work finish time',
  })
  @IsString()
  @IsNotEmpty()
  finish_time: Date;
}
