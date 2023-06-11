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
import { ClienteModule } from 'src/cliente/cliente.module';
import { LocalClienteStrategy } from './strategys/localCliente.strategy';
import { ClienteJwtService } from './modules/clienteJwtService.module';
import { ClienteJwt } from './strategys/clienteJwt.strategy';

@Module({
  imports: [
    ProprietariosModule,
    PropJwtService,
    FuncJwtService,
    ClienteJwtService,
    FuncionarioModule,
    ClienteModule,
  ],
  providers: [
    AuthService,
    ProprietarioJwt,
    FuncJwt,
    ClienteJwt,
    LocalPropStrategy,
    LocalFuncStrategy,
    LocalClienteStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
