import { Module, forwardRef } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { AgendamentoController } from './agendamento.controller';
import { Agendamento } from './entities/agendamento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstabelecimentoModule } from 'src/estabelecimento/estabelecimento.module';
import { ClienteModule } from 'src/cliente/cliente.module';
import { ServicosModule } from 'src/servicos/servicos.module';
import { FuncionarioModule } from 'src/funcionario/funcionario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agendamento]),
    forwardRef(() => ClienteModule),
    forwardRef(() => ServicosModule),
    forwardRef(() => FuncionarioModule),
    forwardRef(() => EstabelecimentoModule),
  ],
  controllers: [AgendamentoController],
  providers: [AgendamentoService],
  exports: [AgendamentoService],
})
export class AgendamentoModule {}
