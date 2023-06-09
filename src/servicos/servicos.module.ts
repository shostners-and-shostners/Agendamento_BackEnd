import { Module, forwardRef } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { ServicosController } from './servicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { EstabelecimentoModule } from 'src/estabelecimento/estabelecimento.module';
import { Servico } from './entities/servico.entity';
import { FuncionarioModule } from 'src/funcionario/funcionario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria, Servico]),
    forwardRef(() => EstabelecimentoModule),
    forwardRef(() => FuncionarioModule),
  ],
  controllers: [ServicosController],
  providers: [ServicosService],
  exports: [ServicosService],
})
export class ServicosModule {}
