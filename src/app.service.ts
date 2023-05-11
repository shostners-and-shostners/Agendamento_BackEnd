import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getLet(): string {
    return 'Coisa mais linda desse mundo, que faz meu coração disparar só de pensar, que desde que conheci me faz me apaixonar cada vez mais, que é essa pessoa incrível e espetacular, que desde que apareceu em minha vida fez ela melhorar incrivelmente';
  }
}
