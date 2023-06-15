import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteJwtAuthGuard } from 'src/auth/guards/ClienteJwtAuthGuard.guard';
import { DatePipe } from 'src/class/date.pipe';
import { DatasDto } from 'src/agendamento/dto/datas.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('criar')
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @UseGuards(ClienteJwtAuthGuard)
  @Patch('update')
  update(@Req() { user }, @Body() dados: UpdateClienteDto) {
    return this.clienteService.update(user.id, dados);
  }

  @UseGuards(ClienteJwtAuthGuard)
  @Get('perfil')
  perfil(@Req() { user }) {
    return this.clienteService.verificaSeExisteId(user.id);
  }

  @Get('pegarPorId')
  porID(@Query('id', ParseIntPipe) id: number) {
    return this.clienteService.verificaSeExisteId(id);
  }

  @UseGuards(ClienteJwtAuthGuard)
  @HttpCode(200)
  @Post('todoAgendamentosToken')
  todoAgendamentosToken(@Req() { user }, @Body() datas: DatasDto) {
    return this.clienteService.pegarAgendamentosDoClie(user.id, datas);
  }

  @HttpCode(200)
  @Post('todoAgendamentos')
  todoAgendamentosT(
    @Query('idCli', ParseIntPipe) idClie: number,
    @Body() datas: DatasDto,
  ) {
    return this.clienteService.pegarAgendamentosDoClie(idClie, datas);
  }
}
