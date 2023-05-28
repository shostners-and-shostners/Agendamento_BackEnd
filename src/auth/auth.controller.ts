import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PropLocalAuthGuard } from './guards/propLocalAuthGuard.guard';
import { PropAuthDto } from './dto/propAuth.dto';
import { AuthGuard } from '@nestjs/passport';
import { PropJwtAuthGuard } from './guards/propJwtAuthGuard.guard';
import { FuncLocalAuthGuard } from './guards/funcLocalAuthGuard.guard';
import { FuncAuthDto } from './dto/funcAuth.dto';
import { FuncJwtAuthGuard } from './guards/funcJwtAuthGuard.guard';

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
}
