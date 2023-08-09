import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDistrictDto } from './create-district.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {
  @ApiProperty({
    example: 'Samarqand',
    description: 'region update name',
  })
  @IsString()
  name?: string;

  @ApiProperty({
    example: 1,
    description: 'region update id',
  })
  @IsNumber()
  region_id?: number;
}
