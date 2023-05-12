import { JwtService } from '@nestjs/jwt';
import { ProprietariosService } from './../proprietarios/proprietarios.service';
import { Inject, Injectable } from '@nestjs/common';
import Hashing from 'src/class/hashing';
import { Proprietarios } from 'src/proprietarios/entities/proprietarios.entity';

@Injectable()
export class AuthService {
  hash: Hashing;
  constructor(
    private propService: ProprietariosService,
    @Inject('PropJwtService')
    private propJWTService: JwtService,
  ) {
    this.hash = new Hashing();
  }

  async validarProprietario(email: string, senha: string) {
    const prop = await this.propService.buscarUmPorEmail(email);
    console.log('prop');
    if (await this.hash.desHashPass(senha, prop.senha)) {
      const { senha, ...resultado } = prop;
      return resultado;
    }
    return null;
  }

  async loginProprietario(prop: any) {
    const payload = { email: prop.email, id: prop.id, role: 'Prop' };
    return {
      token: this.propJWTService.sign(payload),
    };
  }
}
