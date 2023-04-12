import { Column } from 'typeorm';
import Identificadores from './Identificadores';

export default abstract class Pessoa extends Identificadores {
  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  telefone: string;

  @Column()
  cpf: string;

  @Column()
  uf: string;

  @Column()
  cidade: string;

  @Column()
  bairro: string;

  @Column()
  logradouro: string;

  @Column()
  numero: string;

  @Column()
  complemento: string;

  @Column({ default: true })
  ativo: boolean;
}
