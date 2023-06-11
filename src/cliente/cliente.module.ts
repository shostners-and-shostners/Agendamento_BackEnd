import { Module, forwardRef } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { Cliente } from './entities/cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstabelecimentoModule } from 'src/estabelecimento/estabelecimento.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    forwardRef(() => EstabelecimentoModule),
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}
