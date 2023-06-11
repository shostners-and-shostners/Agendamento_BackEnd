import { IsInt, Min, Max, IsNumber } from 'class-validator';

export class NotaDto {
  @IsNumber()
  agendamentoId: number;

  @IsInt({ message: 'A nota deve ser um número inteiro' })
  @Min(1, { message: 'A nota mínima é 1' })
  @Max(5, { message: 'A nota máxima é 5' })
  nota: number;
}
