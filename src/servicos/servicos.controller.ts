import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  ParseIntPipe,
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

  @Get('todos')
  async pegarTodos() {
    return await this.servicosService.pegarTodos();
  }

  @Get('acharUm/:id')
  async findOne(@Param('id') id: string) {
    return await this.servicosService.acharServico(+id);
  }

  @Get('/pegarFuncionarios')
  async pegarFuncionarios(@Query('id', ParseIntPipe) id: number) {
    console.log('nume ' + id);
    return await this.servicosService.pegarFuncionarios(id);
  }

  @Get('/pegarServCat')
  async pegarServCat(@Query('id', ParseIntPipe) id: number) {
    return await this.servicosService.pegarTodosServCat(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServicoDto: UpdateServicoDto,
  ) {
    return await this.servicosService.editarServico(+id, updateServicoDto);
  }
}
