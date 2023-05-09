import { TypeOrmModule } from '@nestjs/typeorm';
import { Proprietarios } from './entities/proprietarios.entity';
import { Module } from '@nestjs/common';
import { ProprietariosService } from './proprietarios.service';
import { ProprietariosController } from './proprietarios.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Proprietarios])],
  controllers: [ProprietariosController],
  providers: [ProprietariosService],
  exports: [ProprietariosService],
})
export class ProprietariosModule {}
