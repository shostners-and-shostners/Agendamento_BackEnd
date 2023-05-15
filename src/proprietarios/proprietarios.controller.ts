import { CriarProprietarioDto } from './dto/CriarProprietario.dto';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProprietariosService } from './proprietarios.service';
import { UpdateProprietarioDto } from './dto/UpdateProprietario.dto';
import { PropJwtAuthGuard } from 'src/auth/guards/propJwtAuthGuard.guard';
@Controller('proprietarios')
export class ProprietariosController {
  constructor(private readonly proprietariosService: ProprietariosService) {}

  @Post('/criar')
  async create(@Body() createProprietarioDto: CriarProprietarioDto) {
    return await this.proprietariosService.create(createProprietarioDto);
  }

  @UseGuards(PropJwtAuthGuard)
  @Patch('/update')
  async update(@Body() data: UpdateProprietarioDto, @Req() { user }) {
    console.log(user);
    return this.proprietariosService.Update(user.id, data);
  }

  @Get('/')
  async getAll() {
    return await this.proprietariosService.getAll();
  }

  @Get('/pegarum')
  async getOne(@Query('id') id) {
    console.log('teste ' + id);
    return await this.proprietariosService.pegarUm(id);
  }
}
