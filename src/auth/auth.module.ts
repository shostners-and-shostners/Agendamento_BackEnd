import { LocalFuncStrategy } from './strategys/localFunc.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProprietariosModule } from 'src/proprietarios/proprietarios.module';
import { PropJwtService } from './modules/propJwtService.module';
import { AuthController } from './auth.controller';
import { LocalPropStrategy } from './strategys/localProp.strategy';
import { ProprietarioJwt } from './strategys/proprietarioJwt.strategy';
import { FuncJwtService } from './modules/funcJwtService.module';
import { FuncJwt } from './strategys/funcJwt.strategy';
import { FuncionarioModule } from 'src/funcionario/funcionario.module';

@Module({
  imports: [
    ProprietariosModule,
    PropJwtService,
    FuncJwtService,
    FuncionarioModule,
  ],
  providers: [
    AuthService,
    LocalPropStrategy,
    ProprietarioJwt,
    FuncJwt,
    LocalFuncStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
