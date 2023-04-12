import { TypeOrmModule } from '@nestjs/typeorm';
import { teste } from './entities/proprietarios.entity';
import { Module } from '@nestjs/common';
import { ProprietariosService } from './proprietarios.service';
import { ProprietariosController } from './proprietarios.controller';

@Module({
  imports: [TypeOrmModule.forFeature([teste])],
  controllers: [ProprietariosController],
  providers: [ProprietariosService],
})
export class ProprietariosModule {}
