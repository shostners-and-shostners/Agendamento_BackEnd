import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class ProprietarioJwt extends PassportStrategy(Strategy, 'jwtProp') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.PROPSECRET,
    });
  }

  async validate(payload: any) {
    console.log(payload);
    return { id: payload.id, email: payload.email };
  }
}
