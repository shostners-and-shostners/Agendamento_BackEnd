import { ExpedienteFuncionario } from './entities/expedienteFuncionario.entity';
import {
  Injectable,
  HttpException,
  NotFoundException,
  Inject,
  forwardRef,
  HttpStatus,
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
import { FuncionarioServico } from './entities/funcionarioServico.entity';
import { ServicosService } from 'src/servicos/servicos.service';
import { CreateFuncionarioServicoDto } from './dto/create-funcionarioServico.dto';
import { Agendamento } from 'src/agendamento/entities/agendamento.entity';
import { AgendamentoService } from 'src/agendamento/agendamento.service';
import { DatasDto } from 'src/agendamento/dto/datas.dto';
import { deleteFile } from 'src/class/file-upload.utils';
import { locationImgFunc } from 'src/class/strings';
import { mudarSenhaDto } from 'src/class/mudarSenha.dto';

@Injectable()
export class FuncionarioService {
  hash: Hashing;
  constructor(
    @InjectRepository(Funcionario)
    private funcRepo: Repository<Funcionario>,
    @InjectRepository(FuncionarioServico)
    private servFunRepo: Repository<FuncionarioServico>,
    @InjectRepository(ExpedienteFuncionario)
    private expediRepo: Repository<ExpedienteFuncionario>,
    private verificaHorario: VerificarHorarios,
    @Inject(forwardRef(() => EstabelecimentoService))
    private readonly estabService: EstabelecimentoService,
    @Inject(ServicosService)
    private readonly servicoServ: ServicosService,
    @Inject(AgendamentoService)
    private readonly agendaServ: AgendamentoService,
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
    //verifica se ids servico existem
    const funServs = [];
    if (dados.servicoIds.length > 0) {
      for (const servId of dados.servicoIds) {
        const funServDto = new CreateFuncionarioServicoDto();
        console.log(servId);
        await this.servicoServ.acharServico(servId);
        funServDto.servicoId = servId;
        funServs.push(funServDto);
      }
    }

    const novoFunc = this.funcRepo.create(dados);

    this.verificaHorario.validarHorarios(dados.horarios);
    const horariosCriados = this.expediRepo.create(dados.horarios);

    const funcCriado = await this.funcRepo.save(novoFunc);

    horariosCriados.forEach((hor) => {
      hor.funcionario = funcCriado;
    });

    await this.expediRepo.save(horariosCriados);
    //--------------------------FunServ
    if (funServs.length > 0) {
      const list = [];
      funServs.forEach((item) => {
        item.funcionarioId = funcCriado.id;
        list.push(this.servFunRepo.create(item));
      });
      await this.servFunRepo.save(list);
    }

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
      relations: ['expedientes', 'servicos', 'servicos.categoria'],
      where: { id },
    });

    if (!func) throw new HttpException('Funcionario não existe', 404);
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

  async adiconarServico(dados: CreateFuncionarioServicoDto) {
    const serv = await this.servicoServ.acharServico(dados.servicoId);
    const func = await this.verificaSeExisteId(dados.funcionarioId);
    if (serv.UIDEstabelecimento != func.UIDEstabelecimento) {
      throw new HttpException(
        'Funcionario e serviço não são do mesmo estabelicimento',
        HttpStatus.BAD_REQUEST,
      );
    }
    const servFun = await this.servFunRepo.findOne({
      where: { funcionarioId: dados.funcionarioId, servicoId: dados.servicoId },
    });
    if (servFun) {
      throw new NotFoundException({
        message: 'Serviço já está cadastrado para esse funcionario',
        serv,
      });
    }
    return await this.servFunRepo.save(dados);
  }

  async removeServico(dados: CreateFuncionarioServicoDto) {
    await this.servicoServ.acharServico(dados.servicoId);
    await this.verificaSeExisteId(dados.funcionarioId);
    const servFun = await this.servFunRepo.findOne({
      where: { funcionarioId: dados.funcionarioId, servicoId: dados.servicoId },
    });
    if (!servFun) {
      throw new NotFoundException(
        'Serviço não encontrado para esse funcionario',
      );
    }
    await this.servFunRepo.remove(servFun);
  }

  async servicos(id: number) {
    const fun = await this.verificaSeExisteId(id);
    return fun.servicos;
  }

  async funcionarioPorServico(idServ: number) {
    const serv = await this.servicoServ.acharServico(idServ);
    console.log(serv);
    const funcs = await this.funcRepo.find({
      relations: ['expedientes'],
      where: { servicos: serv },
    });

    return funcs;
  }

  async pegarAgendamentosDoFunc(id: number, datas: DatasDto) {
    return await this.agendaServ.todosDoFuncio(id, datas);
  }

  async colocarAvatar(uid: number, file: Express.Multer.File) {
    const func = await this.verificaSeExisteId(uid);
    console.log('Teste');
    if (file) {
      if (func.urlFoto != 'funcAvatar.png')
        deleteFile(locationImgFunc + func.urlFoto);

      func.urlFoto = file.filename;
      delete func.expedientes;
      delete func.agendamentos;
      delete func.servicos;
      await this.funcRepo.update(func.id, func);
      return func;
    } else {
      throw new HttpException(
        { msg: 'Arquivo não foi enviado corretamente ' },
        400,
      );
    }
  }

  async mudarSenha(func: Funcionario, senha: string) {
    func.senha = await this.hash.hashPass(senha);
    await this.funcRepo.save(func);
  }
}
