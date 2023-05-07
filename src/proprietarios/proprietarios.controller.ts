import { CriarProprietarioDto } from './dto/CriarProprietario.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProprietariosService } from './proprietarios.service';

@Controller('proprietarios')
export class ProprietariosController {
  constructor(private readonly proprietariosService: ProprietariosService) {}

  @Post('/criar')
  async create(@Body() createProprietarioDto: CriarProprietarioDto) {
    return await this.proprietariosService.create(createProprietarioDto);
  }

  @Get('/')
  async getAll() {
    return await this.proprietariosService.getAll();
  }
}
