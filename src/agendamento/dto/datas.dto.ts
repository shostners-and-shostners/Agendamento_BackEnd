import {
  IsString,
  IsDate,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsDateString,
} from 'class-validator';
export class DatasDto {
  @IsDateString()
  data_inicio: Date;

  @IsDateString()
  data_fim: Date;
}
