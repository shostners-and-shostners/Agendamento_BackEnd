import { Proprietarios } from './entities/proprietarios.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProprietarioDto } from './dto/CreateProprietario.dto';

@Injectable()
export class ProprietariosService {
  constructor(
    @InjectRepository(Proprietarios)
    private proprietariosRepository: Repository<Proprietarios>,
  ) {}

  async create(dados: CreateProprietarioDto) {
    const t = this.proprietariosRepository.create(dados);
    const a = await this.proprietariosRepository.save(t);
    delete a['senha'];
    return {
      res: a,
    };
  }

  async getAll() {
    return this.proprietariosRepository.find();
  }
}
