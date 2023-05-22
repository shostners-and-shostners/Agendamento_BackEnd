import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

enum DiaSemana {
  SEGUNDA = 'segunda',
  TERCA = 'terça',
  QUARTA = 'quarta',
  QUINTA = 'quinta',
  SEXTA = 'sexta',
  SABADO = 'sábado',
  DOMINGO = 'domingo',
}

export class HorarioDiaSemanaDTO {
  @IsEnum(DiaSemana)
  @IsNotEmpty()
  diaSemana: DiaSemana;

  @IsNotEmpty()
  inicio: string;

  @IsNotEmpty()
  fim: string;

  @IsOptional()
  id: number;

  @IsOptional()
  createdAt: string;

  @IsOptional()
  updateAt: string;
}
