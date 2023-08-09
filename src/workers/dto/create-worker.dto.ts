import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
} from 'class-validator';

export class CreateWorkerDto {
  @ApiProperty({
    example: 'John',
    description: 'Worker first_name',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Worker last_name',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 'worker@email.com',
    description: 'Worker email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 1,
    description: 'Worker location id',
  })
  @IsNumber()
  @IsNotEmpty()
  location_id: number;

  @ApiProperty({
    example: '+998991234567',
    description: 'Worker phone_number',
  })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    example: 'Male',
    description: 'Worker gender',
  })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    example: 'Poilkjmnb098',
    description: 'Worker password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
