import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateServiceDto } from './create-service.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @ApiProperty({
    example: 'window cleaner',
    description: 'update service name',
  })
  @IsString()
  name?: string;
}
