import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/JwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  private readonly logger = new Logger(AuthService.name);

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const user = await this.authService.validateUserToken(payload);

    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}
