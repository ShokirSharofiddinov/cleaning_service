import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types'; // Corrected import statement
import { CreateCustomerDto } from './create-customer.dto';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @ApiProperty({
    example: 'Shon',
    description: 'customer first_name update',
  })
  @IsString()
  first_name?: string;

  @ApiProperty({
    example: 'lastname',
    description: 'customer last_name update',
  })
  @IsString()
  last_name?: string;

  @ApiProperty({
    example: 'johhn',
    description: 'customer username update',
  })
  @IsString()
  username?: string;

  @ApiProperty({
    example: 'Poilkjmnb098',
    description: 'customer password update',
  })
  @IsString()
  password?: string;

  @ApiProperty({
    example: 'email@mail.com',
    description: 'customer email',
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'location',
    description: 'customer location id update',
  })
  @IsNumber()
  location_id?: number;

  @ApiProperty({
    example: '+998997894516',
    description: 'customer phone_number update',
  })
  @IsPhoneNumber()
  phone_number?: string;
}
