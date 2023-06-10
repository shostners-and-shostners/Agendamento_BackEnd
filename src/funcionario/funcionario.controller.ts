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
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { FuncJwtAuthGuard } from 'src/auth/guards/funcJwtAuthGuard.guard';
import { CreateFuncionarioServicoDto } from './dto/create-funcionarioServico.dto';

@Controller('funcionario')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post('criar')
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionarioService.create(createFuncionarioDto);
  }

  @UseGuards(FuncJwtAuthGuard)
  @Get('perfil')
  perfil(@Req() { user }) {
    return this.funcionarioService.verificaSeExisteId(user.id);
  }

  @Patch('/update')
  async update(
    @Query('id', ParseIntPipe) id: number,
    @Body() dados: UpdateFuncionarioDto,
  ) {
    console.log(id);
    return this.funcionarioService.update(id, dados);
  }

  @Post('adicionarServico')
  adicionarServico(@Body() dados: CreateFuncionarioServicoDto) {
    return this.funcionarioService.adiconarServico(dados);
  }

  @HttpCode(200)
  @Post('removerServico')
  async removerServico(@Body() dados: CreateFuncionarioServicoDto) {
    return await this.funcionarioService.removeServico(dados);
  }
}
