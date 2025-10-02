import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import path from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, 
          auth: {
            user: configService.get('GMAIL_USER'), 
            pass: configService.get('GMAIL_APP_PASSWORD'), 
          },
        },
        defaults: {
          from: `"minton." <${configService.get('GMAIL_USER')}>`,
        },
        preview: true,
        template: {
          dir: path.join(process.cwd(), 'template'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),

    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }
    ),
    UsersModule,
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
