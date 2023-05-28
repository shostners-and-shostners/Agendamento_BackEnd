import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { FuncionarioModule } from 'src/funcionario/funcionario.module';

@Module({
  imports: [
    FuncionarioModule,
    JwtModule.register({
      secret: process.env.FUNCSECRET,
      signOptions: { expiresIn: '1080000000000000d' },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: 'FuncJwtService',
      useExisting: JwtService,
    },
  ],
  exports: ['FuncJwtService'],
})
export class FuncJwtService {}
