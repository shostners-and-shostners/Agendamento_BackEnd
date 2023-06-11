import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Identificadores from 'src/class/Identificadores';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Funcionario } from 'src/funcionario/entities/funcionario.entity';
import { Servico } from 'src/servicos/entities/servico.entity';

@Entity({ name: 'Agendamento' })
export class Agendamento extends Identificadores {
  @Column({ length: 15 })
  UIDEstabelecimento: string;

  @Column({ default: 'Pendente' })
  status: string;

  @Column()
  data_inicio: Date;

  @Column()
  data_fim: Date;

  @Column({ nullable: true })
  nota: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.agendamentos)
  cliente: Cliente;

  @ManyToOne(() => Servico, (servico) => servico.agendamentos)
  servico: Servico;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.agendamentos)
  funcionario: Funcionario;
}
