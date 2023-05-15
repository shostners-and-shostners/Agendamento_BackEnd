import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

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
}
