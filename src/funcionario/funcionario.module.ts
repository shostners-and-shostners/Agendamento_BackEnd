import { ExpedienteFuncionario } from './entities/expedienteFuncionario.entity';
import { EstabelecimentoService } from './../estabelecimento/estabelecimento.service';
import { Module, forwardRef } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioController } from './funcionario.controller';
import { Funcionario } from './entities/funcionario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificarHorarios } from 'src/class/ValidarHorarios';
import { EstabelecimentoModule } from 'src/estabelecimento/estabelecimento.module';
import { FuncionarioServico } from './entities/funcionarioServico.entity';
import { ServicosModule } from 'src/servicos/servicos.module';
import { AgendamentoModule } from 'src/agendamento/agendamento.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Funcionario,
      ExpedienteFuncionario,
      FuncionarioServico,
    ]),
    forwardRef(() => EstabelecimentoModule),
    forwardRef(() => AgendamentoModule),
    forwardRef(() => ServicosModule),
  ],
  controllers: [FuncionarioController],
  providers: [FuncionarioService, VerificarHorarios],
  exports: [FuncionarioService],
})
export class FuncionarioModule {}
