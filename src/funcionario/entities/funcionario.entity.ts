import Identificadores from 'src/class/Identificadores';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ExpedienteFuncionario } from './expedienteFuncionario.entity';

@Entity('Funcionario')
export class Funcionario extends Identificadores {
  @Column({ name: 'UIDEstabelecimento', nullable: false })
  UIDEstabelecimento: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  cpf: string;

  @Column()
  cnpj: string;

  @Column()
  telefone: string;

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

  @OneToMany(
    () => ExpedienteFuncionario,
    (expediente) => expediente.funcionario,
  )
  @JoinColumn()
  expedientes: ExpedienteFuncionario[];
}
