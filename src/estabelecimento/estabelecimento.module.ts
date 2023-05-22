import { Module } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoController } from './estabelecimento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estabelecimentos } from './entities/estabelecimento.entity';
import { ProprietariosService } from 'src/proprietarios/proprietarios.service';
import { ProprietariosModule } from 'src/proprietarios/proprietarios.module';
import { HorariosEstabelecimento } from './entities/horarios_estabelecimento.entity';
import { VerificarHorarios } from 'src/class/ValidarHorarios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Estabelecimentos, HorariosEstabelecimento]),
    ProprietariosModule,
  ],
  controllers: [EstabelecimentoController],
  providers: [EstabelecimentoService, VerificarHorarios],
})
export class EstabelecimentoModule {}
