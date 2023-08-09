import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({
        example: "admin",
        description: "admin name"
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        example: "admin@email.com",
        description: "admin email"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        example: "Poilkjmnb098",
        description: "admin password"
    })
    @IsString()
    @IsNotEmpty()
    password: string
}
