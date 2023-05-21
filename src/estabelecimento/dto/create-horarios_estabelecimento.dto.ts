import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

enum DiaSemana {
  SEGUNDA = 'segunda',
  TERCA = 'terca',
  QUARTA = 'quarta',
  QUINTA = 'quinta',
  SEXTA = 'sexta',
  SABADO = 'sabado',
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
}

export class HorariosEstabelecimentoDTO {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => HorarioDiaSemanaDTO)
  horarios: HorarioDiaSemanaDTO[];
}
