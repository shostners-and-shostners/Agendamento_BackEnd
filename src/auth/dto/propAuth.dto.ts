import { IsNotEmpty, IsString } from 'class-validator';

export class PropAuthDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  senha: string;
  id: number;
}
