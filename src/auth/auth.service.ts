import { JwtService } from '@nestjs/jwt';
import { ProprietariosService } from './../proprietarios/proprietarios.service';
import { Inject, Injectable } from '@nestjs/common';
import Hashing from 'src/class/hashing';
import { Proprietarios } from 'src/proprietarios/entities/proprietarios.entity';
import { FuncionarioService } from 'src/funcionario/funcionario.service';
import { Funcionario } from 'src/funcionario/entities/funcionario.entity';

@Injectable()
export class AuthService {
  hash: Hashing;
  constructor(
    private propService: ProprietariosService,
    private funcService: FuncionarioService,
    @Inject('PropJwtService')
    private propJWTService: JwtService,
    @Inject('FuncJwtService')
    private funcJWTService: JwtService,
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
  // -------------------------
  async validarFuncionario(email: string, senha: string, estaUID: string) {
    const func = await this.funcService.verificaSeExisteEmail(estaUID, email);

    if (await this.hash.desHashPass(senha, func.senha)) {
      const { senha, ...resultado } = func;
      return resultado;
    }
    return null;
  }

  async loginFuncionario(func: Funcionario) {
    const payload = {
      email: func.email,
      id: func.id,
      role: 'Func',
      estabeUID: func.UIDEstabelecimento,
    };
    return {
      token: this.funcJWTService.sign(payload),
    };
  }
}
