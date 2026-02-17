import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { SocialUserDto } from '../dto/social-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'GOOGLE_CLIENT_SECRET',
      callbackURL: (process.env.BACKEND_URL || 'http://localhost:3001') + '/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos, id } = profile;
    const user: SocialUserDto = {
      email: emails && emails[0] ? emails[0].value : `${id}@google.com`,
      name: name ? `${name.givenName} ${name.familyName}` : 'Google User',
      avatar: photos && photos[0] ? photos[0].value : undefined,
      provider: 'google',
      socialId: id,
    };
    done(null, user);
  }
}
