import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { SocialUserDto } from '../dto/social-user.dto';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID || 'FACEBOOK_APP_ID',
      clientSecret: process.env.FACEBOOK_APP_SECRET || 'FACEBOOK_APP_SECRET',
      callbackURL: (process.env.BACKEND_URL || 'http://localhost:3001') + '/auth/facebook/callback',
      scope: ['email'],
      profileFields: ['emails', 'name', 'photos'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, photos, id } = profile;
    const user: SocialUserDto = {
      email: emails && emails.length > 0 ? emails[0].value : `${id}@facebook.com`,
      name: name ? `${name.givenName} ${name.familyName}` : 'Facebook User',
      avatar: photos && photos.length > 0 ? photos[0].value : undefined,
      provider: 'facebook',
      socialId: id,
    };
    done(null, user);
  }
}
