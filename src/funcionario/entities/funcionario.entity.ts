import Identificadores from 'src/class/Identificadores';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ExpedienteFuncionario } from './expedienteFuncionario.entity';
import { FuncionarioServico } from './funcionarioServico.entity';
import { Servico } from 'src/servicos/entities/servico.entity';
import { Agendamento } from 'src/agendamento/entities/agendamento.entity';

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

  // @OneToMany(() => FuncionarioServico, (servico) => servico.funcionario)
  // servico: FuncionarioServico[];

  @ManyToMany(() => Servico, (servico) => servico.funcionarios)
  @JoinTable({
    name: 'funcionario_servico',
    joinColumns: [{ name: 'funcionarioId' }],
    inverseJoinColumns: [{ name: 'servicoId' }],
  })
  servicos: Servico[];

  @OneToMany(() => Agendamento, (agendamento) => agendamento.funcionario)
  agendamentos: Agendamento[];
}
