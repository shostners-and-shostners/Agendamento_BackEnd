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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProprietariosService } from './proprietarios.service';
import { UpdateProprietarioDto } from './dto/UpdateProprietario.dto';
import { PropJwtAuthGuard } from 'src/auth/guards/propJwtAuthGuard.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { locationImgProp } from 'src/class/strings';
import { editFileName, imageFileFilter } from 'src/class/file-upload.utils';
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

  @UseGuards(PropJwtAuthGuard)
  @Get('/perfil')
  async perfil(@Req() { user }) {
    console.log(user);
    return this.proprietariosService.pegarUm(user.id);
  }

  @Get('/')
  async getAll() {
    return await this.proprietariosService.getAll();
  }

  @Get('/pegarum')
  async getOne(@Query('id') id) {
    return await this.proprietariosService.pegarUm(id);
  }

  @UseGuards(PropJwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: locationImgProp,
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
    return this.proprietariosService.colocarAvatar(user.id, file);
  }
}
