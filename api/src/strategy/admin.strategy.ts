import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(protected config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('SECRET_KEY'),
    });
  }
  async validate(payload: any) {
    if (payload.quyen !== 'ADMIN') {
      throw new UnauthorizedException('Token không có quyền!');
    } else {
      return payload;
    }
  }
}
