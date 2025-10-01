import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, Res, UseInterceptors, Session } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { SigninWithCredentials } from './dto/signin.dto';
import { SignupWithCredentials } from './dto/signup.dto';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/role.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @UseGuards(GoogleAuthGuard)
    @Get('google/login')
    async googleLogin(){

    }

    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    async googleCallback(
        @Request() request,
        @Session() session: Record<string, any>
    ){
        const user = request.user
        session.user = user.uid
        console.log(user)
        return user
    }
    

    @UseGuards(LocalGuard)
    @Post('login')
    @ApiBody({ type: SigninWithCredentials })
    async login(
        @Request() request,
        @Session() session: Record<string, any>
    ) {
        const user = request.user
        session.user = user.uid
        return user
    }

    @Post('register')
    async register(
        @Body() signupWithCredentials: SignupWithCredentials,
        @Session() session: Record<string, any>
    ) {
        const user = await this.authService.signUp(signupWithCredentials);
        session.user = user.uid
        return user
    }

    @Get('me')
    @Roles()
    @UseGuards(RolesGuard)
    me(@Request() req) {
        return req.user;
    }

    @Post('logout')
    logout(@Session() session: Record<string, any>) {
        session.destroy((err) => {
            if (err) console.error(err);
        });
        return { message: 'Logged out' };
    }

}

