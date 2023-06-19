import { HorarioDiaSemanaDTO } from './dto/create-horarios_estabelecimento.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
  UseInterceptors,
  UploadedFile,
  Inject,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { CreateEstabelecimentoDto } from './dto/create-estabelecimento.dto';
import { UpdateEstabelecimentoDto } from './dto/update-estabelecimento.dto';
import { PropJwtAuthGuard } from 'src/auth/guards/propJwtAuthGuard.guard';
import { locationImgEstabe } from 'src/class/strings';
import { editFileName, imageFileFilter } from 'src/class/file-upload.utils';
import { FuncionarioService } from 'src/funcionario/funcionario.service';
import { ClienteService } from 'src/cliente/cliente.service';
import { AgendamentoService } from 'src/agendamento/agendamento.service';
import { DatasDto } from 'src/agendamento/dto/datas.dto';

@Controller('estabelecimento')
export class EstabelecimentoController {
  constructor(
    private readonly estabelecimentoService: EstabelecimentoService,
    private readonly funcionarioService: FuncionarioService,
    private readonly clienteService: ClienteService,
    @Inject(AgendamentoService)
    private readonly agendaServ: AgendamentoService,
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

  @UseGuards(PropJwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: locationImgEstabe,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Post('/image/:UIDD')
  async uploadImage(
    @Param('UIDD') uidd: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.estabelecimentoService.colocarLogo(uidd, file);
  }

  @Get()
  findAll() {
    return this.estabelecimentoService.findAll();
  }

  @UseGuards(PropJwtAuthGuard)
  @Get('/prop')
  async pegarEstabelicimentosProp(@Req() { user }) {
    return await this.estabelecimentoService.pegarEstabelicimentosProp(user.id);
  }

  @Get('/:UIDD')
  async pegarPorUIDD(@Param('UIDD') uidd: string) {
    console.log(uidd);
    return await this.estabelecimentoService.pegarPorUiDD(uidd);
  }

  @UseGuards(PropJwtAuthGuard)
  @Patch('/update')
  async update(
    @Query('uid') uid: string,
    @Body() dados: UpdateEstabelecimentoDto,
  ) {
    console.log(uid);
    if (!uid) throw new BadRequestException('uid invalido');
    return this.estabelecimentoService.update(uid, dados);
  }

  @Get('todosFunc/:UIDD')
  async pegarTodosFunc(@Param('UIDD') uidd: string) {
    console.log(uidd);
    return await this.funcionarioService.todosDeUmEstabelicimento(uidd);
  }

  @Get('todosClientes/:UIDD')
  async pegarTodosClientes(@Param('UIDD') uidd: string) {
    console.log(uidd);
    return await this.clienteService.todosDeUmEstabelicimento(uidd);
  }

  @Get('todasCat/:UIDD')
  async pegarTodosCat(@Param('UIDD') uidd: string) {
    return await this.estabelecimentoService.pegarTodasCategorias(uidd);
  }

  @Get('todosServ/:UIDD')
  async pegarTodosServ(@Param('UIDD') uidd: string) {
    return await this.estabelecimentoService.pegarTodosServ(uidd);
  }

  @HttpCode(200)
  @Post('todosAgendamentos/:UIDD')
  async pegarTodosAgendamentos(
    @Param('UIDD') uidd: string,
    @Body() datas: DatasDto,
  ) {
    return await this.agendaServ.todosDoEstabelicimento(uidd, datas);
  }
}
