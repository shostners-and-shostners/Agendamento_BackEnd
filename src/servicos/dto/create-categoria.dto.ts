import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateCategoriaDto {
  @IsOptional()
  UIDEstabelecimento: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
