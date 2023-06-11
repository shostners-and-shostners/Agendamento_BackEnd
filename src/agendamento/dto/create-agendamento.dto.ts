import {
  IsString,
  IsDate,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsDateString,
} from 'class-validator';
export class CreateAgendamentoDto {
  @IsString()
  UIDEstabelecimento: string;

  @IsDateString()
  data_inicio: Date;

  data_fim?: Date;

  nota?: number;

  @IsInt()
  clienteId: number;

  @IsInt()
  servicoId: number;

  @IsInt()
  funcionarioId: number;
}
