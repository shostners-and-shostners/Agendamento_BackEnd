import { Agendamento } from 'src/agendamento/entities/agendamento.entity';
import Identificadores from 'src/class/Identificadores';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'Cliente' })
export class Cliente extends Identificadores {
  @Column({ name: 'UIDEstabelecimento' })
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

  @Column()
  CEP: string;

  @Column({ default: true })
  ativo: boolean;

  @Column({ default: 'userAvatar.png' })
  urlFoto: string;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.cliente)
  agendamentos: Agendamento[];
}
