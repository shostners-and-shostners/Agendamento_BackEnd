import { Controller } from '@nestjs/common';
import { ProprietariosService } from './proprietarios.service';

@Controller('proprietarios')
export class ProprietariosController {
  constructor(private readonly proprietariosService: ProprietariosService) {}
}
