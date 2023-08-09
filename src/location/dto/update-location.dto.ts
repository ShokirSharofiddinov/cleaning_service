import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
  @ApiProperty({
    example: 1,
    description: 'location home number update',
  })
  @IsNumber()
  home_number?: number;

  @ApiProperty({
    example: 1,
    description: 'location region id update',
  })
  @IsNumber()
  region_id?: number;

  @ApiProperty({
    example: 1,
    description: 'location district id update',
  })
  @IsNumber()
  district_id?: number;

  @ApiProperty({
    example: 1,
    description: 'location street_name',
  })
  @IsString()
  street_name: string;
}
