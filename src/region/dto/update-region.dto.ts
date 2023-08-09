import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRegionDto } from './create-region.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateRegionDto extends PartialType(CreateRegionDto) {
  @ApiProperty({
    example: 'tashkent',
    description: 'update region name',
  })
  @IsString()
  name?: string;
}
