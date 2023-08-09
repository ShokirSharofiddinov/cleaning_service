import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    example: 'john',
    description: 'customer first_name',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: 'lastName',
    description: 'customer last_name',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 'johnn',
    description: 'customer username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'Poilkjmnb098',
    description: 'customer password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'email@gmail.com',
    description: 'customer email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 1,
    description: 'customer location id',
  })
  @IsNumber()
  @IsNotEmpty()
  location_id: number;

  @ApiProperty({
    example: '+998997894516',
    description: 'customer phone_number number',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone_number: string;
}
