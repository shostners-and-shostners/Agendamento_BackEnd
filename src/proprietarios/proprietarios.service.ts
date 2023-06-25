import { Proprietarios } from './entities/proprietarios.entity';
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarProprietarioDto } from './dto/CriarProprietario.dto';
import Hashing from 'src/class/hashing';
import VerificaSeExiste from 'src/class/VerificaSeExist';
import { UpdateProprietarioDto } from './dto/UpdateProprietario.dto';
import { response } from 'express';
import { CreateAgendamentoADMDto } from 'src/agendamento/dto/create-agendamentoADM.dto';
import { CreateClienteDto } from 'src/cliente/dto/create-cliente.dto';
import { locationImgProp } from 'src/class/strings';
import { deleteFile } from 'src/class/file-upload.utils';

@Injectable()
export class ProprietariosService {
  hash: Hashing;
  verificador: VerificaSeExiste;
  constructor(
    @InjectRepository(Proprietarios)
    private proprietariosRepository: Repository<Proprietarios>,
  ) {
    this.hash = new Hashing();
    this.verificador = new VerificaSeExiste();
  }

  async create(dados: CriarProprietarioDto) {
    //verifica se já esta cadastrado
    await this.verificador.proprietarioJaExiste(
      this.proprietariosRepository,
      dados,
    );
    //faz o hash da senha
    dados.senha = await this.hash.hashPass(dados.senha);

    const novoProprietario: Proprietarios =
      await this.proprietariosRepository.save(dados);

    delete novoProprietario['senha'];
    return novoProprietario;
  }

  async Update(id: number, data: UpdateProprietarioDto) {
    const prop = this.proprietariosRepository.findBy({ id });
    if (!prop) throw new NotFoundException();
    await this.proprietariosRepository.update(id, data);
    return this.proprietariosRepository.findBy({ id });
  }

  async getAll() {
    console.log(this.hash.pegarCharsAleatorios(6));
    return this.proprietariosRepository.find();
  }

  async pegarUm(id: number) {
    const prop = await this.proprietariosRepository.findOne({ where: { id } });
    console.log(prop);
    if (!prop) throw new NotFoundException();
    return prop;
  }
  async buscarUmPorEmail(email: string) {
    const prop = await this.proprietariosRepository.findOne({
      where: { email },
    });

    if (!prop) throw new NotFoundException();
    return prop;
  }

  async colocarAvatar(uid: number, file: Express.Multer.File) {
    const prop = await this.pegarUm(uid);
    console.log('Teste');
    if (file) {
      if (prop.urlFoto != 'propAvatar.png')
        deleteFile(locationImgProp + prop.urlFoto);

      prop.urlFoto = file.filename;
      await this.proprietariosRepository.update(prop.id, prop);
      return prop;
    } else {
      throw new HttpException(
        { msg: 'Arquivo não foi enviado corretamente ' },
        400,
      );
    }
  }

  async mudarSenha(prop: Proprietarios, senha: string) {
    prop.senha = await this.hash.hashPass(senha);
    prop.tokenRecuperar = null;
    await this.proprietariosRepository.save(prop);
  }

  async save(prop: Proprietarios) {
    await this.proprietariosRepository.save(prop);
  }

  async pegarPeloToken(token: string) {
    const prop = await this.proprietariosRepository.findOne({
      where: { tokenRecuperar: token },
    });

    if (!prop) throw new HttpException('Token inválido', HttpStatus.FORBIDDEN);
    return prop;
  }
}
