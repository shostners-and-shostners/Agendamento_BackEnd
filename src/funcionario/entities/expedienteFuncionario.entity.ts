import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Funcionario } from './funcionario.entity';
import Identificadores from 'src/class/Identificadores';

@Entity('ExpedienteFuncionario')
export class ExpedienteFuncionario extends Identificadores {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  diaSemana: string;

  @Column({ nullable: true })
  inicio: string;

  @Column({ nullable: true })
  fim: string;

  @Column()
  funcionarioId: number;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.expedientes)
  @JoinColumn({ name: 'funcionarioId' })
  funcionario: Funcionario;
}
