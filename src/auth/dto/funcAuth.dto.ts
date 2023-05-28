import { IsNotEmpty, IsString } from 'class-validator';

export class FuncAuthDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  senha: string;
  @IsString()
  @IsNotEmpty()
  estabeUID: string;
  id: number;
}
