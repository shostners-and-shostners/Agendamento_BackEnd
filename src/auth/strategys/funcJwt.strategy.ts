import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class FuncJwt extends PassportStrategy(Strategy, 'jwtFunc') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.FUNCSECRET,
    });
  }

  async validate(payload: any) {
    console.log(payload);
    if (payload.role == 'Func')
      return { id: payload.id, email: payload.email, role: payload.role };
    else console.log('negado');
  }
}
