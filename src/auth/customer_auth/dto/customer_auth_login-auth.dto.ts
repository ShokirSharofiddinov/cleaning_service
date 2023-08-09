import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    example: 'email@mail.com',
    description: 'emial uchun',
  })
  readonly email: string;

  @ApiProperty({
    example: 'p@a$$w0rd',
    description: 'password uchun',
  })
  readonly password: string;
}
