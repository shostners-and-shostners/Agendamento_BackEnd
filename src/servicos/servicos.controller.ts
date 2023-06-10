import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFuncionarioServicoDto } from 'src/funcionario/dto/create-funcionarioServico.dto';

@Controller('servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @Post('criar')
  create(@Body() dados: CreateServicoDto) {
    return this.servicosService.criarServico(dados);
  }

  @Get()
  async pegarTodos() {
    return await this.servicosService.pegarTodos();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.servicosService.acharServico(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicoDto: UpdateServicoDto) {
    return this.servicosService.editarServico(+id, updateServicoDto);
  }
}
