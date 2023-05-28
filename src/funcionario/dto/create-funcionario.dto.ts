import { HorarioDiaSemanaDTO } from './../../estabelecimento/dto/create-horarios_estabelecimento.dto';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsPhoneNumber,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';

export class CreateFuncionarioDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  UIDEstabelecimento: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  senha: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsOptional()
  cnpj: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('BR')
  telefone: string;

  @IsString()
  @IsOptional()
  uf: string;

  @IsString()
  @IsOptional()
  cidade: string;

  @IsString()
  @IsOptional()
  bairro: string;

  @IsString()
  @IsOptional()
  logradouro: string;

  @IsString()
  @IsOptional()
  numero: string;

  @IsString()
  @IsOptional()
  complemento: string;

  @IsOptional()
  ativo: boolean;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => HorarioDiaSemanaDTO)
  horarios: HorarioDiaSemanaDTO[];
}
