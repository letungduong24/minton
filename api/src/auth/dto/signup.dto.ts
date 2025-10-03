import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

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
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })  
  password: string;
}
