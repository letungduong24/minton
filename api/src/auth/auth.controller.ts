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
    @UseGuards(AuthGuard)
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

    @Get('/resend-verifylink')
      @Roles('admin')
      @UseGuards(AuthGuard, VerifiedGuard, RolesGuard)
      getVerifyCode(@Request() req){
        
        return this.authService.getVerifyLink(req.user.uid)
    }

    @Get('/verify/:code')
    verify(@Param('code') code: string) {
        return this.authService.verify(code)
    }

}

