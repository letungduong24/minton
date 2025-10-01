import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';

@Injectable()
export class CookieService {
  private readonly COOKIE_NAME = 'access_token';
  private readonly COOKIE_OPTIONS: {
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'strict' | 'lax';
    maxAge: number;
  };

  constructor(private readonly configService: ConfigService) {
    const nodeEnv = this.configService.get<string>('NODE_ENV');
    
    this.COOKIE_OPTIONS = {
      httpOnly: true,
      secure: nodeEnv === 'production',
      sameSite: nodeEnv === 'production' ? 'strict' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, 
    };
  }

  setAccessToken(response: Response, token: string): void {
    response.cookie(this.COOKIE_NAME, token, this.COOKIE_OPTIONS);
  }

  clearAccessToken(response: Response): void {
    response.clearCookie(this.COOKIE_NAME);
  }
}
