import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalPropStrategy extends PassportStrategy(Strategy, 'prop') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'senha',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validarProprietario(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
