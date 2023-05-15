import { Module } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoController } from './estabelecimento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estabelecimentos } from './entities/estabelecimento.entity';
import { ProprietariosService } from 'src/proprietarios/proprietarios.service';
import { ProprietariosModule } from 'src/proprietarios/proprietarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([Estabelecimentos]), ProprietariosModule],
  controllers: [EstabelecimentoController],
  providers: [EstabelecimentoService],
})
export class EstabelecimentoModule {}
