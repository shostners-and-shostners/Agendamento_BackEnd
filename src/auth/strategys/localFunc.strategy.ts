import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalFuncStrategy extends PassportStrategy(Strategy, 'func') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'senha',
      passReqToCallback: true,
    });
  }

  async validate(req: any, username: string, password: string): Promise<any> {
    console.log('ar:' + username + ' ' + password);
    const user = await this.authService.validarFuncionario(
      username,
      password,
      req.body.estabeUID,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
