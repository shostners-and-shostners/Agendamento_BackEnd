import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { ProprietariosModule } from './proprietarios/proprietarios.module';
import { AuthModule } from './auth/auth.module';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { ServicosModule } from './servicos/servicos.module';
import { ClienteModule } from './cliente/cliente.module';
import { AgendamentoModule } from './agendamento/agendamento.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ProprietariosModule,
    AuthModule,
    EstabelecimentoModule,
    FuncionarioModule,
    ServicosModule,
    ClienteModule,
    AgendamentoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
