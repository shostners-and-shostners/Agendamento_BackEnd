import { Body, Controller, Post } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';

@Controller('agendamento')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}
  @Post('criar')
  async criar(@Body() dados: CreateAgendamentoDto) {
    return await this.agendamentoService.criar(dados);
  }
}
