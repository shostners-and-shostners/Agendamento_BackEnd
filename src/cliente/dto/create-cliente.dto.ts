import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  minLength,
  MinLength,
  IsPhoneNumber,
} from 'class-validator';

export class CreateClienteDto {
  @IsString()
  UIDEstabelecimento: string;

  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;

  @IsString()
  cpf: string;

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
}
