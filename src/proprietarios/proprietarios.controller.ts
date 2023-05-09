import { CriarProprietarioDto } from './dto/CriarProprietario.dto';
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ProprietariosService } from './proprietarios.service';
import { UpdateProprietarioDto } from './dto/UpdateProprietario.dto';
@Controller('proprietarios')
export class ProprietariosController {
  constructor(private readonly proprietariosService: ProprietariosService) {}

  @Post('/criar')
  async create(@Body() createProprietarioDto: CriarProprietarioDto) {
    return await this.proprietariosService.create(createProprietarioDto);
  }

  @Patch('/update')
  async update(@Body() data: UpdateProprietarioDto) {
    return await this.proprietariosService.Update();
  }

  @Get('/')
  async getAll() {
    return await this.proprietariosService.getAll();
  }
}
