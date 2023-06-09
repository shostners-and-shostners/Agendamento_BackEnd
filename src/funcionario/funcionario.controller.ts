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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { FuncJwtAuthGuard } from 'src/auth/guards/funcJwtAuthGuard.guard';
import { CreateFuncionarioServicoDto } from './dto/create-funcionarioServico.dto';
import { use } from 'passport';
import { DatasDto } from 'src/agendamento/dto/datas.dto';
import { locationImgFunc } from 'src/class/strings';
import { editFileName, imageFileFilter } from 'src/class/file-upload.utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('funcionario')
export class FuncionarioController {
  clienteService: any;
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

  @Get('pegarPorId')
  pegarPorId(@Query('id', ParseIntPipe) id: number) {
    return this.funcionarioService.verificaSeExisteId(id);
  }

  @UseGuards(FuncJwtAuthGuard)
  @HttpCode(200)
  @Post('todoAgendamentosToken')
  todoAgendamentosToken(@Req() { user }, @Body() datas: DatasDto) {
    return this.funcionarioService.pegarAgendamentosDoFunc(user.id, datas);
  }

  @HttpCode(200)
  @Post('todoAgendamentos')
  todoAgendamentosT(
    @Query('idFunc', ParseIntPipe) idFunc: number,
    @Body() datas: DatasDto,
  ) {
    return this.funcionarioService.pegarAgendamentosDoFunc(idFunc, datas);
  }

  @Get('servicos/:id')
  servicos(@Param('id') id: string) {
    return this.funcionarioService.servicos(+id);
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

  @UseGuards(FuncJwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: locationImgFunc,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Post('/image')
  async uploadImage(
    @Req() { user },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.funcionarioService.colocarAvatar(user.id, file);
  }
}
