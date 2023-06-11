import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agendamento } from './entities/agendamento.entity';
import { ClienteService } from 'src/cliente/cliente.service';
import { EstabelecimentoService } from 'src/estabelecimento/estabelecimento.service';
import { ServicosService } from 'src/servicos/servicos.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { FuncionarioService } from 'src/funcionario/funcionario.service';
import * as moment from 'moment';

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
    @Inject(FuncionarioService)
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

  async todosDoEstabelicimento(uid: string) {
    await this.estabService.pegarPorUiDD(uid);
    const agendamentos = this.agenRepo.find({
      relations: ['funcionario', 'servico', 'cliente'],
      where: { UIDEstabelecimento: uid },
    });
    return agendamentos;
  }
}
