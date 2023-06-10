import { Module, forwardRef } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { ServicosController } from './servicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { EstabelecimentoModule } from 'src/estabelecimento/estabelecimento.module';
import { Servico } from './entities/servico.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria, Servico]),
    forwardRef(() => EstabelecimentoModule),
  ],
  controllers: [ServicosController],
  providers: [ServicosService],
  exports: [ServicosService],
})
export class ServicosModule {}
