import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  imports: [
    ClienteModule,
    JwtModule.register({
      secret: process.env.CLIENTSECRET,
      signOptions: { expiresIn: '1080000000000000d' },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: 'ClienteJwtService',
      useExisting: JwtService,
    },
  ],
  exports: ['ClienteJwtService'],
})
export class ClienteJwtService {}
