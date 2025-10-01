import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserByCredentialsDto {
  @ApiProperty({ description: "Name of the user", required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: "Profile image of the user", required: false })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ description: "Email of the user" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Hashed password" })
  @IsString()
  passwordHash: string;

}

export class CreateUserByGoogleDto {
  @ApiProperty({ description: "Name of the user", required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: "Profile image of the user", required: false })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ description: "Email of the user" })
  @IsEmail()
  email: string;
}
