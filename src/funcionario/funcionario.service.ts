import { ExpedienteFuncionario } from './entities/expedienteFuncionario.entity';
import {
  Injectable,
  HttpException,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcionario } from './entities/funcionario.entity';
import { Repository } from 'typeorm';
import { VerificarHorarios } from 'src/class/ValidarHorarios';
import Hashing from 'src/class/hashing';
import { EstabelecimentoService } from 'src/estabelecimento/estabelecimento.service';
import { AlreadyExist } from 'src/exceptions/alreadyExist.exception';

@Injectable()
export class FuncionarioService {
  hash: Hashing;
  constructor(
    @InjectRepository(Funcionario)
    private funcRepo: Repository<Funcionario>,
    @InjectRepository(ExpedienteFuncionario)
    private expediRepo: Repository<ExpedienteFuncionario>,
    private verificaHorario: VerificarHorarios,
    @Inject(forwardRef(() => EstabelecimentoService))
    private readonly estabService: EstabelecimentoService,
  ) {
    this.hash = new Hashing();
  }
  async create(dados: CreateFuncionarioDto) {
    const funcExist = await this.buscarPorEmail(
      dados.UIDEstabelecimento,
      dados.email,
    );
    if (funcExist)
      throw new AlreadyExist('Email já existe para estabelecimento');

    dados.senha = await this.hash.hashPass(dados.senha);
    const novoFunc = this.funcRepo.create(dados);

    this.verificaHorario.validarHorarios(dados.horarios);
    const horariosCriados = this.expediRepo.create(dados.horarios);

    const funcCriado = await this.funcRepo.save(novoFunc);

    horariosCriados.forEach((hor) => {
      hor.funcionario = funcCriado;
    });

    await this.expediRepo.save(horariosCriados);
    delete funcCriado['senha'];
    return await this.buscarPorEmail(
      funcCriado.UIDEstabelecimento,
      funcCriado.email,
    );
  }

  async buscarPorEmail(uid: string, email: string) {
    console.log('uid:' + uid);
    await this.estabService.pegarPorUiDD(uid);
    const func = await this.funcRepo.findOne({
      relations: ['expedientes'],
      where: { email: email, UIDEstabelecimento: uid },
    });
    return func;
  }

  async verificaSeExisteEmail(uid: string, email: string) {
    const func = await this.buscarPorEmail(uid, email);
    if (!func)
      throw new HttpException(
        'Funcionario não existe para esse estabelecimento',
        404,
      );
    return func;
  }

  async verificaSeExisteId(id: number) {
    const func = await this.funcRepo.findOne({
      relations: ['expedientes'],
      where: { id },
    });
    if (!func)
      throw new HttpException(
        'Funcionario não existe para esse estabelecimento',
        404,
      );
    return func;
  }

  async todosDeUmEstabelicimento(uid: string) {
    await this.estabService.pegarPorUiDD(uid);
    const funcs = await this.funcRepo.find({
      relations: ['expedientes'],
      where: { UIDEstabelecimento: uid },
    });
    return funcs;
  }

  async update(id: number, dados: UpdateFuncionarioDto) {
    const func = await this.verificaSeExisteId(id);
    if (dados.horarios) {
      this.verificaHorario.validarHorarios(dados.horarios);
      const expediente = await this.expediRepo.find({
        where: { funcionarioId: func.id },
      });
      if (expediente) await this.expediRepo.remove(expediente);
      const horariosCriados = this.expediRepo.create(dados.horarios);
      horariosCriados.forEach((hor) => {
        hor.funcionario = func;
      });
      await this.expediRepo.save(horariosCriados);
    }
    delete dados.horarios;
    await this.funcRepo.update(func.id, dados);
    return await this.verificaSeExisteId(func.id);
  }
}
