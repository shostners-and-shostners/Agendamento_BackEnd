import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ProprietariosModule } from 'src/proprietarios/proprietarios.module';

@Module({
  imports: [
    ProprietariosModule,
    JwtModule.register({
      secret: process.env.PROPSECRET,
      signOptions: { expiresIn: '1080000000000000d' },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: 'PropJwtService',
      useExisting: JwtService,
    },
  ],
  exports: ['PropJwtService'],
})
export class PropJwtService {}
