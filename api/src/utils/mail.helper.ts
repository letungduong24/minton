import { MailerService } from "@nestjs-modules/mailer";

export class MailHelper{
    static sendVerify(mail: MailerService, userInfo: any, verifyLink: string ){
        mail.sendMail({
                to: userInfo.email,
                subject: 'Xác thực tài khoản của bạn',
                template: 'verify', 
                context: {
                    name: userInfo.name, 
                    verifyLink, 
                },
            })
        .then(() => {})
        .catch(() => {});
    }
}