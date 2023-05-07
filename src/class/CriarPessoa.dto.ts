import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export default abstract class CriarPessoaDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  senha: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('BR')
  telefone: string;

  @IsString()
  @IsOptional()
  cpf: string;

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
