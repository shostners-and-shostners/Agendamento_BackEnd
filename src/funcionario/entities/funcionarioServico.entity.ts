import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Funcionario } from './funcionario.entity';
import { Servico } from 'src/servicos/entities/servico.entity';
import Identificadores from 'src/class/Identificadores';

@Entity({ name: 'funcionario_servico' })
export class FuncionarioServico extends Identificadores {
  @Column({ name: 'funcionarioId' })
  funcionarioId: number;

  @Column({ name: 'servicoId' })
  servicoId: number;

  @ManyToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionarioId' })
  funcionario: Funcionario;

  @ManyToOne(() => Servico)
  @JoinColumn({ name: 'servicoId' })
  servico: Servico;
}
