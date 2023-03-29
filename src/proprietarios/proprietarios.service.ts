import { Proprietario } from './entities/proprietario.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProprietariosService {
  constructor(
    @InjectRepository(Proprietario)
    private userRepository: Repository<Proprietario>,
  ) {}

  buscarUm(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
