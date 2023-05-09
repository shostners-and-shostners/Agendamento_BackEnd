import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CriarProprietarioDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  senha: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  telefone: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  uf: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  bairro: string;

  @IsString()
  @IsNotEmpty()
  logradouro: string;

  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsString()
  @IsOptional()
  complemento: string;
}
