import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import {RedisStore} from "connect-redis"
import session from "express-session"
import {createClient} from "redis"
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // .env
  const configService = app.get(ConfigService);

  // config redis
  const redisUrl = configService.get<string>('REDIS_URL');
  const sessionSecret = configService.get<string>('SESSION_SECRET');

  let redisClient = createClient({ url: redisUrl })
  redisClient.connect().catch(console.error)

  let redisStore = new RedisStore({
    client: redisClient,
    prefix: "sess:",
    ttl: 24 * 60 * 60,
    disableTouch: false
  })

  // config session
  const isProd = configService.get<string>('NODE_ENV') === 'production';
  const clientUrl = configService.get<string>('CLIENT_URL')

  app.enableCors({
    origin: clientUrl,
    credentials: true,  
  });


  app.use(
    session({
      store: redisStore,
      resave: false,
      saveUninitialized: false, 
      secret: sessionSecret,
      cookie: {
        httpOnly: true,
        secure: isProd,            
        sameSite: isProd ? 'none' : 'lax', 
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
  )


  // swagger
  const config = new DocumentBuilder()
    .setTitle('Badminton')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  // class validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const PORT = configService.get<number>('PORT') || 3000;
  await app.listen(PORT ?? 3000);
}
bootstrap();
