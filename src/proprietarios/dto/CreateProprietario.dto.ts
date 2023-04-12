import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class CreateProprietarioDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  senha: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  telefone: string;
}
