import { Cliente } from './../cliente/entities/cliente.entity';
import { JwtService } from '@nestjs/jwt';
import { ProprietariosService } from './../proprietarios/proprietarios.service';
import {
  HttpCode,
  HttpException,
  Inject,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import Hashing from 'src/class/hashing';
import { Proprietarios } from 'src/proprietarios/entities/proprietarios.entity';
import { FuncionarioService } from 'src/funcionario/funcionario.service';
import { Funcionario } from 'src/funcionario/entities/funcionario.entity';
import { ClienteService } from 'src/cliente/cliente.service';
import { mudarSenhaDto } from 'src/class/mudarSenha.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  hash: Hashing;
  constructor(
    private propService: ProprietariosService,
    private funcService: FuncionarioService,
    private clienteService: ClienteService,
    @Inject('PropJwtService')
    private propJWTService: JwtService,
    @Inject('FuncJwtService')
    private funcJWTService: JwtService,
    @Inject('ClienteJwtService')
    private clienteJWTService: JwtService,
    private mailerService: MailerService,
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

  //--------------------------
  async validarCliente(email: string, senha: string, estaUID: string) {
    const cliente = await this.clienteService.verificaSeExisteEmail(
      estaUID,
      email,
    );

    if (await this.hash.desHashPass(senha, cliente.senha)) {
      const { senha, ...resultado } = cliente;
      return resultado;
    }
    return null;
  }

  async loginCliente(cliente: Cliente) {
    const payload = {
      email: cliente.email,
      id: cliente.id,
      role: 'Cliente',
      estabeUID: cliente.UIDEstabelecimento,
    };
    return {
      token: this.clienteJWTService.sign(payload),
    };
  }

  async propMudarSenha(dados: mudarSenhaDto) {
    const prop = await this.propService.pegarPeloToken(dados.token);
    await this.propService.mudarSenha(prop, dados.senha);
  }

  async propRecuperarSenha(email: string) {
    const prop = await this.propService.buscarUmPorEmail(email);
    prop.tokenRecuperar = randomBytes(32).toString('hex');
    await this.propService.save(prop);

    const mail = {
      to: prop.email,
      from: 'agendamento@snet.com',
      subject: 'Recuperação de senha',
      template: './reset-pass',
      context: {
        token: prop.tokenRecuperar,
      },
    };

    try {
      this.mailerService.sendMail(mail);
    } catch (error) {
      throw new HttpException(
        'Erro ao enviar o email:' + error,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return prop.tokenRecuperar;
  }

  async checkToken(token: string) {
    await this.propService.pegarPeloToken(token);
  }
}
