import { Injectable } from '@nestjs/common';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estabelecimentos } from './entities/estabelecimento.entity';
import { Repository } from 'typeorm';
import { ProprietariosService } from 'src/proprietarios/proprietarios.service';
import Hashing from 'src/class/hashing';

@Injectable()
export class EstabelecimentoService {
  hash: Hashing;
  constructor(
    @InjectRepository(Estabelecimentos)
    private estabeRepo: Repository<Estabelecimentos>,
    private readonly propService: ProprietariosService,
  ) {
    this.hash = new Hashing();
  }
  async create(dados: CreateEstabelecimentoDto, id: number) {
    const prop = await this.propService.pegarUm(id);
    let esta: any;
    console.log(esta);
    let uud;
    do {
      uud = await this.hash.pegarCharsAleatorios(6);
      console.log(uud);
      esta = await this.estabeRepo.findOne({ where: { uid: uud } });
    } while (esta != null);
    dados.uid = uud;

    const novoEstabelecimento = this.estabeRepo.create(dados);
    novoEstabelecimento.proprietarios = prop;

    return await this.estabeRepo.save(novoEstabelecimento);
  }

  async findAll() {
    return await this.estabeRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} estabelecimento`;
  }

  update(id: number, updateEstabelecimentoDto: UpdateEstabelecimentoDto) {
    return `This action updates a #${id} estabelecimento`;
  }

  remove(id: number) {
    return `This action removes a #${id} estabelecimento`;
  }
}
