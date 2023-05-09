import { Proprietarios } from './entities/proprietarios.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarProprietarioDto } from './dto/CriarProprietario.dto';
import Hashing from 'src/class/hashing';
import VerificaSeExiste from 'src/class/VerificaSeExist';

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

  async Update() {
    return this.proprietariosRepository.find();
  }

  async getAll() {
    return this.proprietariosRepository.find();
  }

  async buscarUmPorEmail(email: string) {
    const prop = await this.proprietariosRepository.findOne({
      where: { email },
    });
    if (!prop) throw new NotFoundException();
    return prop;
  }

  
}
