import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class SignupWithCredentials {
  @ApiProperty({ description: "Name of the user", required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: "Email of the user" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Password of the user" })
  @IsString()
  password: string;
}
