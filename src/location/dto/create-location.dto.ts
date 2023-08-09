import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLocationDto {
  @ApiProperty({
    example: 7,
    description: 'location home number',
  })
  @IsNumber()
  @IsNotEmpty()
  home_number: number;

  @ApiProperty({
    example: 1,
    description: 'location region id',
  })
  @IsNumber()
  @IsNotEmpty()
  region_id: number;

  @ApiProperty({
    example: 1,
    description: 'location district id',
  })
  @IsNumber()
  @IsNotEmpty()
  district_id: number;

  @ApiProperty({
    example: 'streetName',
    description: 'location street name',
  })
  @IsString()
  @IsNotEmpty()
  street_name: string;
}
