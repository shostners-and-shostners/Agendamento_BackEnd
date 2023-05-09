import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProprietariosModule } from 'src/proprietarios/proprietarios.module';
import { PropJwtService } from './modules/propJwtService.module';
import { AuthController } from './auth.controller';
import { LocalPropStrategy } from './strategys/localProp.strategy';
import { ProprietarioJwt } from './strategys/proprietarioJwt.strategy';

@Module({
  imports: [ProprietariosModule, PropJwtService],
  providers: [AuthService, LocalPropStrategy, ProprietarioJwt],
  controllers: [AuthController],
})
export class AuthModule {}
