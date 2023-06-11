import {
  IsString,
  IsDate,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsDateString,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';
export class CreateAgendamentoADMDto {
  @IsString()
  UIDEstabelecimento: string;

  @IsDateString()
  data_inicio: Date;

  @IsInt()
  servicoId: number;

  @IsInt()
  funcionarioId: number;

  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  nome: string;

  @IsString({ message: 'O telefone deve ser uma string' })
  @IsNotEmpty({ message: 'O telefone não pode estar vazio' })
  @IsPhoneNumber('BR', { message: 'O telefone deve estar no formato correto' })
  telefone: string;

  @IsString({ message: 'O CPF deve ser uma string' })
  @IsNotEmpty({ message: 'O CPF não pode estar vazio' })
  cpf: string;
}
