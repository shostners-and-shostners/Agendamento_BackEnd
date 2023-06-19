import { ServicosService } from './../servicos/servicos.service';
import { locationImgEstabe } from 'src/class/strings';
import { HorarioDiaSemanaDTO } from './dto/create-horarios_estabelecimento.dto';
import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estabelecimentos } from './entities/estabelecimento.entity';
import { Repository } from 'typeorm';
import { ProprietariosService } from 'src/proprietarios/proprietarios.service';
import Hashing from 'src/class/hashing';
import { HorariosEstabelecimento } from './entities/horarios_estabelecimento.entity';
import { plainToClass } from 'class-transformer';
import { VerificarHorarios } from 'src/class/ValidarHorarios';
import { deleteFile } from 'src/class/file-upload.utils';
import { FuncionarioService } from 'src/funcionario/funcionario.service';

@Injectable()
export class EstabelecimentoService {
  hash: Hashing;
  constructor(
    @InjectRepository(Estabelecimentos)
    private estabeRepo: Repository<Estabelecimentos>,
    private readonly propService: ProprietariosService,
    @InjectRepository(HorariosEstabelecimento)
    private horariosRepo: Repository<HorariosEstabelecimento>,
    private verificaHorario: VerificarHorarios,
    @Inject(forwardRef(() => ServicosService))
    private readonly servicoServ: ServicosService,
  ) {
    this.hash = new Hashing();
  }
  async create(dados: CreateEstabelecimentoDto, id: number) {
    const prop = await this.propService.pegarUm(id);
    let esta: Estabelecimentos | undefined;
    let uud;
    do {
      uud = await this.hash.pegarCharsAleatorios(6);
      esta = await this.estabeRepo.findOne({ where: { uid: uud } });
    } while (esta);

    dados.uid = uud;

    const novoEstabelecimento = this.estabeRepo.create(dados);
    novoEstabelecimento.proprietarios = prop;

    this.verificaHorario.validarHorarios(dados.horarios);
    const horariosCriados = this.horariosRepo.create(dados.horarios);

    const estabeCriado: Estabelecimentos = await this.estabeRepo.save(
      novoEstabelecimento,
    );

    horariosCriados.forEach((hor) => {
      hor.estabelecimento = estabeCriado;
    });

    await this.horariosRepo.save(horariosCriados);

    return await this.estabeRepo.findOne({ where: { uid: estabeCriado.uid } });
  }

  async findAll() {
    return await this.estabeRepo.find();
  }

  async update(uidd: string, dados: UpdateEstabelecimentoDto) {
    const estabe = await this.pegarPorUiDDSemImag(uidd);

    if (dados.horarios) {
      this.verificaHorario.validarHorarios(dados.horarios);
      const stabHorarios = await this.horariosRepo.find({
        where: { estabelecimento: estabe },
      });

      if (stabHorarios) await this.horariosRepo.remove(stabHorarios);
      const horariosCriados = this.horariosRepo.create(dados.horarios);
      horariosCriados.forEach((hor) => {
        hor.estabelecimento = estabe;
      });
      await this.horariosRepo.save(horariosCriados);
      delete dados.horarios;
    }

    console.log(dados);
    await this.estabeRepo.update(estabe.id, dados);
    return await this.estabeRepo.findOne({ where: { id: estabe.id } });
  }

  async pegarEstabelicimentosProp(id: number) {
    //await this.verificaSeExiste(id);
    const estabs = this.estabeRepo.find({
      where: { proprietariosId: id },
      relations: ['horarios'],
    });
    return estabs;
  }

  async verificaSeExiste(id: number): Promise<Estabelecimentos> {
    const esta = await this.estabeRepo.findOne({
      loadEagerRelations: false,
      where: { id },
    });
    if (!esta) throw new HttpException('Estabelecimento não encontrado', 404);
    return esta;
  }

  async pegarPorUiDDSemImag(uidd: string) {
    const esta = await this.estabeRepo.findOneBy({
      uid: uidd,
    });

    if (!esta) {
      throw new NotFoundException('Estabelecimento não existe');
    }

    return esta;
  }

  async pegarPorUiDD(uidd: string, file?: Express.Multer.File) {
    const esta = await this.estabeRepo.findOne({
      loadEagerRelations: true,
      where: {
        uid: uidd,
      },
    });

    if (!esta) {
      if (file) deleteFile('./' + file.path);
      throw new NotFoundException('Estabelecimento não existe');
    }

    return esta;
  }

  async colocarLogo(uid: string, file: Express.Multer.File) {
    const estabe = await this.pegarPorUiDD(uid, file);
    console.log('Teste');
    if (file) {
      if (estabe.imageUrl != 'logoEstabelecimento.png')
        deleteFile(locationImgEstabe + estabe.imageUrl);

      estabe.imageUrl = file.filename;
      delete estabe.horarios;
      await this.estabeRepo.update(estabe.id, estabe);
      return estabe;
    } else {
      throw new HttpException(
        { msg: 'Arquivo não foi enviado corretamente ' },
        400,
      );
    }
  }

  async pegarTodasCategorias(uid: string) {
    await this.pegarPorUiDD(uid);
    return await this.servicoServ.pegarTodasCatego(uid);
  }

  async pegarTodosServ(uid: string) {
    await this.pegarPorUiDD(uid);
    return await this.servicoServ.pegarTodosServ(uid);
  }
}
