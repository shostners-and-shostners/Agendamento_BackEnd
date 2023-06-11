import { IsEnum, IsNumber } from 'class-validator';

enum StatusEnum {
  Pendente = 'Pendente',
  Bloqueado = 'Bloqueado',
  Confirmado = 'Confirmado',
  Finalizado = 'Finalizado',
}

export class MudarStatusAgenDto {
  @IsNumber()
  agendamentoId: number;

  @IsEnum(StatusEnum)
  status: StatusEnum;
}
