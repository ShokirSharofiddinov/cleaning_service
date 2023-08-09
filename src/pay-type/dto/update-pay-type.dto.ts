import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePayTypeDto } from './create-pay-type.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePayTypeDto extends PartialType(CreatePayTypeDto) {
  @ApiProperty({
    example: 'card',
    description: 'update payType name',
  })
  @IsString()
  type?: string;
}
