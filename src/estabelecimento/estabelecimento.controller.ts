import {
  HorarioDiaSemanaDTO,
  HorariosEstabelecimentoDTO,
} from './dto/create-horarios_estabelecimento.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';
import { PropJwtAuthGuard } from 'src/auth/guards/propJwtAuthGuard.guard';
import { identity } from 'rxjs';
import { FindOneParams } from 'src/class/findOneParams';

@Controller('estabelecimento')
export class EstabelecimentoController {
  constructor(
    private readonly estabelecimentoService: EstabelecimentoService,
  ) {}

  @UseGuards(PropJwtAuthGuard)
  @Post('/criar')
  async create(
    @Body() createEstabelecimentoDto: CreateEstabelecimentoDto,
    @Req() { user },
  ) {
    return await this.estabelecimentoService.create(
      createEstabelecimentoDto,
      user.id,
    );
  }

  @Get()
  findAll() {
    return this.estabelecimentoService.findAll();
  }

  @UseGuards(PropJwtAuthGuard)
  @Get('/prop')
  async pegarEstabelicimentosProp(@Req() { user }) {
    return await this.estabelecimentoService.pegarEstabelicimento(user.id);
  }

  @UseGuards(PropJwtAuthGuard)
  @Patch('/update')
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dados: UpdateEstabelecimentoDto,
  ) {
    return this.estabelecimentoService.update(id, dados);
  }

  @UseGuards(PropJwtAuthGuard)
  @Post('/setar_horarios')
  async setarHorarios(
    @Query('id', ParseIntPipe) id: number,
    @Body() dados: HorariosEstabelecimentoDTO,
  ) {
    return this.estabelecimentoService.setarHorarios(id, dados);
  }
}
