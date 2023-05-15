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
} from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';
import { PropJwtAuthGuard } from 'src/auth/guards/propJwtAuthGuard.guard';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estabelecimentoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstabelecimentoDto: UpdateEstabelecimentoDto,
  ) {
    return this.estabelecimentoService.update(+id, updateEstabelecimentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estabelecimentoService.remove(+id);
  }
}
