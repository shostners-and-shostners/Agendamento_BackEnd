import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { MudarStatusAgenDto } from './dto/mudarStatusAgen.dto';
import { NotaDto } from './dto/nota.dto';
import { CreateAgendamentoADMDto } from './dto/create-agendamentoADM.dto';
import { PropJwtAuthGuard } from 'src/auth/guards/propJwtAuthGuard.guard';

@Controller('agendamento')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}
  @Post('criar')
  async criar(@Body() dados: CreateAgendamentoDto) {
    return await this.agendamentoService.criar(dados);
  }

  @UseGuards(PropJwtAuthGuard)
  @Post('criarAdm')
  async criarAdm(@Body() dados: CreateAgendamentoADMDto) {
    return await this.agendamentoService.criarAgendamentoAdm(dados);
  }

  @HttpCode(200)
  @Post('mudarStatus')
  async mudarStatus(@Body() status: MudarStatusAgenDto) {
    return await this.agendamentoService.mudarStatus(status);
  }

  @HttpCode(200)
  @Post('darNota')
  async darNota(@Body() nota: NotaDto) {
    return await this.agendamentoService.darNota(nota);
  }

  @Get('pegarPorId')
  async pegarPorId(@Query('idAgend', ParseIntPipe) idAgend: number) {
    return await this.agendamentoService.pegarAgendamentoPorId(idAgend);
  }
}
