import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { ProprietariosModule } from './proprietarios/proprietarios.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ProprietariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
