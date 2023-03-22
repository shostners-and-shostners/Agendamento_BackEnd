import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ClienteModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'agendamento.cvlowgi0iwez.us-east-2.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      password: '*MLyH37K',
      database: 'AGENDAMENTO',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
