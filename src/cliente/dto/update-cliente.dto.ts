import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';

export class UpdateClienteDto extends PartialType(
  OmitType(CreateClienteDto, ['email', 'senha', 'cpf', 'UIDEstabelecimento']),
) {}
