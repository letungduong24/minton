import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, Res, UseInterceptors, Session, Param, Response } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { SigninWithCredentials } from './dto/signin.dto';
import { SignupWithCredentials } from './dto/signup.dto';
import { Roles } from './decorators/roles.decorator';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { VerifiedGuard } from './guards/verify.guard';
import { RolesGuard } from './guards/roles.guard';
import { ConfigService } from '@nestjs/config';
import { Throttle } from '@nestjs/throttler';
import { THROTTLER } from 'src/constants/throttler.constants';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService
    ) {}

    @UseGuards(GoogleAuthGuard)
    @Get('google/login')
    async googleLogin(){

    }

    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    async googleCallback(
        @Request() request,
        @Session() session: Record<string, any>,
        @Response() res
    ){
        const user = request.user
        session.user = user.uid
        const clientUrl = this.configService.get<string>('CLIENT_URL');
        res.redirect(`${clientUrl}?success=true`);
    }
    

    @UseGuards(LocalGuard)
    @Post('login')
    @ApiBody({ type: SigninWithCredentials })
    login(
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
    @UseGuards(AuthGuard, VerifiedGuard)
    me(@Request() req) {
        return req.user;
    }

    @Post('logout')
    async logout(@Session() session: Record<string, any>) {
        await session.destroy((err) => {
            if (err) console.error(err);
        });
        return { message: 'Logged out' };
    }

    @Get('/resend-verifylink')
    @UseGuards(AuthGuard)
    @Throttle(THROTTLER.VERIFY)
    async  getVerifyLink(@Request() req){
        return await this.authService.getVerifyLink(req.user.uid)
    }

    @Get('/verify/:code')
    async verify(
        @Param('code') code: string,
        @Response() res
    ) {
        const clientUrl = this.configService.get<string>('CLIENT_URL');
        await this.authService.verify(code)
        res.redirect(`${clientUrl}?verified=true`);
    }

}

