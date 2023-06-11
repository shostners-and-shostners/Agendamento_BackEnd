import Identificadores from 'src/class/Identificadores';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  Min,
  IsPositive,
} from 'class-validator';
import { Categoria } from './categoria.entity';
import { Funcionario } from 'src/funcionario/entities/funcionario.entity';
import { Agendamento } from 'src/agendamento/entities/agendamento.entity';

@Entity({ name: 'Servico' })
export class Servico extends Identificadores {
  @Column({ name: 'UIDEstabelecimento' })
  @IsNotEmpty()
  @IsString()
  UIDEstabelecimento: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  nome: string;

  @Column({ type: 'float' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  preco: number;

  @Column({ default: true })
  @IsBoolean()
  ativo: boolean;

  @Column({ name: 'tempoMedioMin' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  tempoMedioMin: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'categoriaId' })
  categoria: Categoria;

  @ManyToMany(() => Funcionario, (funcionario) => funcionario.servicos)
  @JoinTable({
    name: 'funcionario_servico',
    joinColumns: [{ name: 'servicoId' }],
    inverseJoinColumns: [{ name: 'funcionarioId' }],
  })
  funcionarios: Funcionario[];

  @OneToMany(() => Agendamento, (agendamento) => agendamento.servico)
  agendamentos: Agendamento[];
}
