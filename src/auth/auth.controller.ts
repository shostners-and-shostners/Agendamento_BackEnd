import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PropLocalAuthGuard } from './guards/propLocalAuthGuard.guard';
import { PropAuthDto } from './dto/propAuth.dto';
import { PropJwtAuthGuard } from './guards/propJwtAuthGuard.guard';
import { FuncLocalAuthGuard } from './guards/funcLocalAuthGuard.guard';
import { FuncAuthDto } from './dto/funcAuth.dto';
import { FuncJwtAuthGuard } from './guards/funcJwtAuthGuard.guard';
import { ClienteLocalAuthGuard } from './guards/clienteLocalAuthGuard.guard';
import { ClienteAuthDto } from './dto/clienteAuth.dto';
import { ClienteJwtAuthGuard } from './guards/ClienteJwtAuthGuard.guard';
import { mudarSenhaDto } from 'src/class/mudarSenha.dto';
import { EmailDto } from './dto/email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(PropLocalAuthGuard)
  @Post('proprietario')
  authUser(@Body() data: PropAuthDto, @Req() { user }) {
    return this.authService.loginProprietario(user);
  }

  @UseGuards(FuncLocalAuthGuard)
  @Post('funcionario')
  authFunc(@Body() data: FuncAuthDto, @Req() { user }) {
    return this.authService.loginFuncionario(user);
  }

  @UseGuards(ClienteLocalAuthGuard)
  @Post('cliente')
  authCliente(@Body() data: ClienteAuthDto, @Req() { user }) {
    console.log(user);
    return this.authService.loginCliente(user);
  }

  @UseGuards(ClienteJwtAuthGuard)
  @Get('testeClienteToken')
  testeCliente(@Req() { user }) {
    return user;
  }

  @UseGuards(PropJwtAuthGuard)
  @Get('/testePropToken')
  teste(@Req() { user }) {
    return user;
  }

  @UseGuards(FuncJwtAuthGuard)
  @Get('/testeFuncToken')
  testeFunc(@Req() { user }) {
    return user;
  }

  @HttpCode(200)
  @Post('/proprietario/mudarSenha')
  async mudarSenhaFunc(@Body() dados: mudarSenhaDto) {
    return await this.authService.propMudarSenha(dados);
  }

  @HttpCode(200)
  @Post('/proprietario/recuperarSenha')
  async mudarSenhaProp(@Body() dados: EmailDto) {
    return await this.authService.propRecuperarSenha(dados.email);
  }

  @HttpCode(200)
  @Get('/proprietario/verificarToken/:token')
  async verificarToken(@Param('token') token: string) {
    return await this.authService.checkToken(token);
  }
}
