import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePayTypeDto {
  @ApiProperty({
    example: 'card',
    description: 'payType name',
  })
  @IsString()
  @IsNotEmpty()
  type: string;
}
