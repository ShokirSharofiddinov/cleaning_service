import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @ApiProperty({
    example: 'admin',
    description: 'admin name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'admin@email.com',
    description: 'admin email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Poilkjmnb098',
    description: 'admin password',
  })
  @IsString()
  password: string;
}
