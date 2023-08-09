import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    example: 'window cleaner',
    description: 'service name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
