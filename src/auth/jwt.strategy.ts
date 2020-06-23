import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  private readonly logger = new Logger(AuthService.name);

  async validate(payload: any, done: Function) {
    const user = await this.authService.validateUserToken(payload);

    this.logger.log(user);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}
