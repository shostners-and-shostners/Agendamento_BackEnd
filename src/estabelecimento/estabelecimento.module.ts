import { Module, forwardRef } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoController } from './estabelecimento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estabelecimentos } from './entities/estabelecimento.entity';
import { ProprietariosService } from 'src/proprietarios/proprietarios.service';
import { ProprietariosModule } from 'src/proprietarios/proprietarios.module';
import { HorariosEstabelecimento } from './entities/horarios_estabelecimento.entity';
import { VerificarHorarios } from 'src/class/ValidarHorarios';
import { FuncionarioService } from 'src/funcionario/funcionario.service';
import { FuncionarioModule } from 'src/funcionario/funcionario.module';
import { ServicosModule } from 'src/servicos/servicos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estabelecimentos, HorariosEstabelecimento]),
    ProprietariosModule,
    ServicosModule,
    forwardRef(() => FuncionarioModule),
  ],
  controllers: [EstabelecimentoController],
  providers: [EstabelecimentoService, VerificarHorarios],
  exports: [EstabelecimentoService],
})
export class EstabelecimentoModule {}
