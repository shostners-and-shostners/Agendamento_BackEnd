import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateFuncionarioDto } from './create-funcionario.dto';

export class UpdateFuncionarioDto extends PartialType(
  OmitType(CreateFuncionarioDto, [
    'email',
    'senha',
    'cpf',
    'UIDEstabelecimento',
    'cnpj',
  ]),
) {}
