import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { CriarProprietarioDto } from './CriarProprietario.dto';

export class UpdateProprietarioDto extends PartialType(
  OmitType(CriarProprietarioDto, ['id', 'email', 'senha', 'cpf']),
) {}
