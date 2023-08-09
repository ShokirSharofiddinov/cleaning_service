import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Max,
} from 'class-validator';
import { CreateWorkerDto } from './create-worker.dto';

export class UpdateWorkerDto extends PartialType(CreateWorkerDto) {
  @ApiProperty({
    example: 'Shon',
    description: 'Worker first_name update',
  })
  @IsString()
  first_name?: string;

  @ApiProperty({
    example: 'lastname',
    description: 'Worker last_name update',
  })
  @IsString()
  last_name?: string;

  @ApiProperty({
    example: 'email@mail.com',
    description: 'Worker email update',
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 1,
    description: 'Worker location_id update',
  })
  @IsNumber()
  location_id?: number;

  @ApiProperty({
    example: '+9989912345678',
    description: 'Worker phone_number update',
  })
  @IsString()
  phone_number?: string;

  @ApiProperty({
    example: 'Male',
    description: 'Worker gender update',
  })
  @IsString()
  gender?: string;

  @ApiProperty({
    example: 'Poilkjmnb0982',
    description: 'Worker password update',
  })
  @IsString()
  password?: string;
}
