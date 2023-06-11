import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class ClienteJwt extends PassportStrategy(Strategy, 'jwtCliente') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.CLIENTSECRET,
    });
  }

  async validate(payload: any) {
    console.log('sdasdas ');
    console.log(payload);
    if (payload.role == 'Cliente')
      return { id: payload.id, email: payload.email, role: payload.role };
    else console.log('negado');
  }
}
