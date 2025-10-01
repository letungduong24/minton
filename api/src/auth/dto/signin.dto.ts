import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class SigninWithCredentials {
  @ApiProperty({ description: "Email of the user" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Password of the user" })
  @IsString()
  password: string;
}
