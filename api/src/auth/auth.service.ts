import { ConflictException, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { PasswordHelper } from 'src/utils/password.helper';
import { SignupWithCredentials } from './dto/signup.dto';
import { SigninWithCredentials } from './dto/signin.dto';
import { PrismaService } from 'src/shared/prisma/prisma.services';
import { VerifyCodeHelper } from 'src/utils/verifycode.helper';
import { MailerService } from '@nestjs-modules/mailer';
import { MailHelper } from 'src/utils/mail.helper';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private prisma: PrismaService,
        private mailerService: MailerService,
        private configService: ConfigService
    ) {}

    async signUp(signupWithCredentials: SignupWithCredentials){
        const hashedPassword = await PasswordHelper.Hash(signupWithCredentials.password)
        const data = await this.userService.create({
            name: signupWithCredentials.name,
            email: signupWithCredentials.email,
            passwordHash: hashedPassword,
        })
        const verifyLink = data.verifyLink
        const {passwordHash, ...userInfo} = data.userInfo
        MailHelper.sendVerify(this.mailerService, userInfo, verifyLink)
        return userInfo
    }

    async getProfile(id: number){
        const user = await this.userService.findOne(id)
        if (!user){
            throw new UnauthorizedException("Token expired")
        }
        return user
    }

    async validateUser(signinWithCredentials: SigninWithCredentials) {
        const user = await this.userService.findByEmail(signinWithCredentials.email)
        if (user.passwordHash){
            if(user && await PasswordHelper.Compare(signinWithCredentials.password, user.passwordHash)){
                const {passwordHash, ...userInfo} = user
                return userInfo
            }
            throw new UnauthorizedException('Email hoặc mật khẩu không tồn tại')
        }
        else {
            throw new NotAcceptableException("Đây là tài khoản đăng nhập bằng Google")
        }
    }

    async validateGoogleUser(googleProfile: any) {
        try {
            const user = await this.userService.findByEmail(googleProfile.emails[0].value)
            if (user){
                return user
            }
            
        } catch (error) {
            const firstName = googleProfile.name?.givenName;
            const lastName = googleProfile.name?.familyName;

            let fullName = firstName ?? ""; 
            if (lastName) {
            fullName += ` ${lastName}`; 
            }

            const email = googleProfile.emails?.[0]?.value;
            if (!email) {
                throw new Error("Email is required from Google profile");
            }

            const image = googleProfile.photos?.[0]?.value;

            return await this.userService.createWithGoogle({
            name: fullName,
            email,
            ...(image && { image }), 
            });

        }
    }

    async getVerifyLink(userId: number) {
        const serverVerifyUrl = this.configService.get<string>('SERVER_VERIFY_URL')
        const user = await this.prisma.user.findUnique({
            where: { uid: userId },
            include: { verifyCode: true }
        });

        if (!user) throw new NotFoundException('User does not exist');
        if (user.isVerified) throw new ConflictException('User is already verified');

        if (user.verifyCode) {
            if (!VerifyCodeHelper.isExpired(user.verifyCode)) {
                const verifyLink = serverVerifyUrl + user.verifyCode.code
                MailHelper.sendVerify(this.mailerService, user, verifyLink)
                return {
                    message: "Verify link sent"
                }; 
            }
            const updated = await this.prisma.verifyCode.update({
                where: { id: user.verifyCode.id },
                data: VerifyCodeHelper.createForUser(userId)
            });
            const verifyLink = serverVerifyUrl + updated.code
            MailHelper.sendVerify(this.mailerService, user, verifyLink)
            return {
                message: "Verify link sent"
            }; 
        }

        const newVerifyCode = await this.prisma.verifyCode.create({
            data: VerifyCodeHelper.createForUser(userId)
        });
        const verifyLink = serverVerifyUrl + newVerifyCode.code
        MailHelper.sendVerify(this.mailerService, user, verifyLink)
        return {
            message: "Verify link sent"
        }; 
    }





    async verify(code: string) {
        try {
        const verifyCode = await this.prisma.verifyCode.findUnique({
            where: {
            code
            },
        });

        if(!verifyCode){
            throw new NotFoundException('Verify code is not exist')
        }
        
        if (VerifyCodeHelper.isExpired(verifyCode)) {
            throw new NotFoundException('Verify code is expired');
        }

        await this.prisma.user.update({
            where: {
                uid: verifyCode.userId
            },
            data: {
                isVerified: true,
                verifyCode: {
                    delete: true
                }
            }
        })

        return {
            messsage: "User verified successfully"
        }

        } catch (error) {
        throw error;
        }
    }
    
}
