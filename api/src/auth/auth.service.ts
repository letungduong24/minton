import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { PasswordHelper } from 'src/utils/password.helper';
import { SignupWithCredentials } from './dto/signup.dto';
import { SigninWithCredentials } from './dto/signin.dto';


@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
    ) {}

    async signUp(signupWithCredentials: SignupWithCredentials){
        const hashedPassword = await PasswordHelper.Hash(signupWithCredentials.password)
        const user = await this.userService.create({
            name: signupWithCredentials.name,
            email: signupWithCredentials.email,
            passwordHash: hashedPassword,
        })
        const {passwordHash, ...userInfo} = user
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
            throw new UnauthorizedException('Invalid credentials')
        }
        else {
            throw new NotAcceptableException("This is Google User")
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
    
}
