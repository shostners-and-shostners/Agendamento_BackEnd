import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsBoolean,
  Min,
  IsOptional,
} from 'class-validator';
import { CreateCategoriaDto } from './create-categoria.dto';

export class CreateServicoDto {
  @IsNotEmpty()
  @IsString()
  readonly UIDEstabelecimento: string;

  @IsNotEmpty()
  @IsString()
  readonly nome: string;

  @IsNotEmpty()
  @IsNumber()
  readonly preco: number;

  @IsBoolean()
  readonly ativo?: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly tempoMedioMin: number;

  @IsNotEmpty()
  @IsString()
  readonly descricao: string;

  @IsOptional()
  readonly categoriaId: number;

  @IsNotEmpty()
  categoria: CreateCategoriaDto;
}
