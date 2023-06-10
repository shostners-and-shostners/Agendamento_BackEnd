import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFuncionarioServicoDto {
  @IsNotEmpty()
  @IsNumber()
  funcionarioId: number;

  @IsNotEmpty()
  @IsNumber()
  servicoId: number;
}
