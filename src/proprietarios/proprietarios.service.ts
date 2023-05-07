import { Proprietarios } from './entities/proprietarios.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarProprietarioDto } from './dto/CriarProprietario.dto';
import Hashing from 'src/class/hashing';

let hash: Hashing;

@Injectable()
export class ProprietariosService {
  constructor(
    @InjectRepository(Proprietarios)
    private proprietariosRepository: Repository<Proprietarios>,
  ) {
    hash = new Hashing();
  }

  async create(dados: CriarProprietarioDto) {
    const jaCadastrado: number = await this.proprietariosRepository.count({
      where: [
        { telefone: dados.telefone },
        { email: dados.email },
        { cpf: dados.cpf },
      ],
    });

    if (jaCadastrado != 0) {
      return 'já cadastrado';
    }

    dados.senha = await hash.hashPass(dados.senha);

    let prop = this.proprietariosRepository.create(dados);
    prop = await this.proprietariosRepository.save(prop);

    delete prop['senha'];
    return prop;
  }

  async getAll() {
    return this.proprietariosRepository.find();
  }
}
