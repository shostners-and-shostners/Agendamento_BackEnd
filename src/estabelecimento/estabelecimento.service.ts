import {
  HorarioDiaSemanaDTO,
  HorariosEstabelecimentoDTO,
} from './dto/create-horarios_estabelecimento.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estabelecimentos } from './entities/estabelecimento.entity';
import { Repository } from 'typeorm';
import { ProprietariosService } from 'src/proprietarios/proprietarios.service';
import Hashing from 'src/class/hashing';
import { HorariosEstabelecimento } from './entities/horarios_estabelecimento.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class EstabelecimentoService {
  hash: Hashing;
  constructor(
    @InjectRepository(Estabelecimentos)
    private estabeRepo: Repository<Estabelecimentos>,
    private readonly propService: ProprietariosService,
    @InjectRepository(HorariosEstabelecimento)
    private horariosRepo: Repository<HorariosEstabelecimento>,
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

  async update(idEstabe: number, dados: UpdateEstabelecimentoDto) {
    const estabe = await this.estabeRepo.findOne({ where: { id: idEstabe } });
    if (!estabe) throw new HttpException('Estabelecimento não encontrado', 404);
    await this.estabeRepo.update(estabe, dados);
    return await this.estabeRepo.findOne({ where: { id: idEstabe } });
  }

  async pegarEstabelicimento(id: number) {
    const esta = await this.verificaSeExiste(id);
    return esta;
  }

  async verificaSeExiste(id: number): Promise<Estabelecimentos> {
    const esta = await this.estabeRepo.findOne({ where: { id } });
    if (!esta) throw new HttpException('Estabelecimento não encontrado', 404);
    return esta;
  }

  async setarHorarios(id: number, dados: HorariosEstabelecimentoDTO) {
    const esta = await this.verificaSeExiste(id);

    const horarios: HorariosEstabelecimento[] = plainToClass(
      HorariosEstabelecimento,
      dados.horarios,
    );
    esta.horarios = horarios;
    return esta;
  }
}
