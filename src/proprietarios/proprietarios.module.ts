import { TypeOrmModule } from '@nestjs/typeorm';
import { Proprietario } from './entities/proprietario.entity';
import { Module } from '@nestjs/common';
import { ProprietariosService } from './proprietarios.service';
import { ProprietariosController } from './proprietarios.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Proprietario])],
  controllers: [ProprietariosController],
  providers: [ProprietariosService],
})
export class ProprietariosModule {}
