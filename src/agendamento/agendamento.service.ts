import {
  Inject,
  Injectable,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Agendamento } from './entities/agendamento.entity';
import { ClienteService } from 'src/cliente/cliente.service';
import { EstabelecimentoService } from 'src/estabelecimento/estabelecimento.service';
import { ServicosService } from 'src/servicos/servicos.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { FuncionarioService } from 'src/funcionario/funcionario.service';
import * as moment from 'moment';
import { DatasDto } from './dto/datas.dto';
import { MudarStatusAgenDto } from './dto/mudarStatusAgen.dto';
import { NotaDto } from './dto/nota.dto';
import { CreateAgendamentoADMDto } from './dto/create-agendamentoADM.dto';
import { CreateClienteDto } from 'src/cliente/dto/create-cliente.dto';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agendamento)
    private agenRepo: Repository<Agendamento>,
    @Inject(EstabelecimentoService)
    private readonly estabService: EstabelecimentoService,
    @Inject(ServicosService)
    private readonly servicoServ: ServicosService,
    @Inject(ClienteService)
    private readonly clienteServ: ClienteService,
    @Inject(forwardRef(() => FuncionarioService))
    private readonly funcServ: FuncionarioService,
  ) {}

  async criar(dados: CreateAgendamentoDto) {
    console.log(dados);
    await this.estabService.pegarPorUiDD(dados.UIDEstabelecimento);
    const cliente = await this.clienteServ.verificaSeExisteId(dados.clienteId);
    const servico = await this.servicoServ.acharServico(dados.servicoId);
    const func = await this.funcServ.verificaSeExisteId(dados.funcionarioId);
    dados.data_fim = moment(dados.data_inicio)
      .add(servico.tempoMedioMin, 'minutes')
      .toDate();
    const agendamento = this.agenRepo.create(dados);
    agendamento.cliente = cliente;
    agendamento.funcionario = func;
    agendamento.servico = servico;
    return await this.agenRepo.save(agendamento);
  }

  async todosDoEstabelicimento(uid: string, datas: DatasDto) {
    await this.estabService.pegarPorUiDD(uid);
    const agendamentos = this.agenRepo.find({
      relations: ['funcionario', 'servico', 'cliente'],
      where: {
        UIDEstabelecimento: uid,
        data_inicio: Between(datas.data_inicio, datas.data_fim),
      },
    });
    return agendamentos;
  }

  async todosDoFuncio(id: number, datas: DatasDto) {
    const func = await this.funcServ.verificaSeExisteId(id);
    const agendamentos = this.agenRepo.find({
      relations: ['servico', 'cliente'],
      where: {
        funcionario: func,
        data_inicio: Between(datas.data_inicio, datas.data_fim),
      },
    });
    return agendamentos;
  }

  async todosDoClie(id: number, datas: DatasDto) {
    const cliente = await this.clienteServ.verificaSeExisteId(id);
    const agendamentos = this.agenRepo.find({
      relations: ['funcionario', 'servico'],
      where: {
        cliente: cliente,
        data_inicio: Between(datas.data_inicio, datas.data_fim),
      },
    });
    return agendamentos;
  }

  async mudarStatus(status: MudarStatusAgenDto) {
    const agend = await this.pegarAgendamentoPorId(status.agendamentoId);
    agend.status = status.status;
    await this.agenRepo.update(agend.id, agend);
    return await this.pegarAgendamentoPorId(status.agendamentoId);
  }

  async pegarAgendamentoPorId(id: number) {
    const agend = await this.agenRepo.findOne({ where: { id: id } });
    if (!agend) throw new NotFoundException('Agendamento não existe');
    return agend;
  }

  async darNota(nota: NotaDto) {
    const agend = await this.pegarAgendamentoPorId(nota.agendamentoId);
    agend.nota = nota.nota;
    await this.agenRepo.update(agend.id, agend);
    return await this.pegarAgendamentoPorId(nota.agendamentoId);
  }

  async criarAgendamentoAdm(dados: CreateAgendamentoADMDto) {
    const clienteDto = new CreateClienteDto();
    clienteDto.UIDEstabelecimento = dados.UIDEstabelecimento;
    clienteDto.cpf = dados.cpf;
    clienteDto.nome = dados.nome;
    clienteDto.telefone = dados.telefone;
    clienteDto.email = 'anonimo@snet.com';
    const cliente = await this.clienteServ.createAnoni(clienteDto);
    const agenDto = new CreateAgendamentoDto();
    agenDto.UIDEstabelecimento = dados.UIDEstabelecimento;
    agenDto.clienteId = cliente.id;
    agenDto.data_inicio = dados.data_inicio;
    agenDto.funcionarioId = dados.funcionarioId;
    agenDto.servicoId = dados.servicoId;
    return await this.criar(agenDto);
  }
}
