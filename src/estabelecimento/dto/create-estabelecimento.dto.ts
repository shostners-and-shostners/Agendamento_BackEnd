import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { HorarioDiaSemanaDTO } from './create-horarios_estabelecimento.dto';

export class CreateEstabelecimentoDto {
  id: number;

  proprietariosId: number;

  uid: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  telefone: string;

  @IsString()
  uf: string;

  @IsString()
  cidade: string;

  @IsString()
  bairro: string;

  @IsString()
  logradouro: string;

  @IsString()
  numero: string;

  @IsString()
  @IsOptional()
  complemento: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => HorarioDiaSemanaDTO)
  horarios: HorarioDiaSemanaDTO[];
}
