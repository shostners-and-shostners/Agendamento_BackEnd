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
  IsNumber,
} from 'class-validator';

export class mudarSenhaDto {
  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
