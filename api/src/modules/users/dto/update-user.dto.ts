import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateProfileDto {
    @ApiProperty({ description: "Name of the user", required: false })
    @IsOptional()
    @IsString()
    @IsOptional()
    name: string;
    
    @ApiProperty({ description: "Profile image of the user" })
    @IsOptional()
    @IsString()
    image: string;
}

export class UpdatePassworDto {
    @ApiProperty({ description: "Old password of the user" })
    @IsOptional()
    @IsString()
    oldPassword: string;

    @ApiProperty({ description: "New password of the user" })
    @IsOptional()
    @IsString()
    hashedPassword: string;

}
