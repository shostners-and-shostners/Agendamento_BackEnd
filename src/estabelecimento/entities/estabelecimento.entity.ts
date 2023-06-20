import { HorariosEstabelecimento } from './horarios_estabelecimento.entity';
import Identificadores from 'src/class/Identificadores';
import { Proprietarios } from 'src/proprietarios/entities/proprietarios.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity('Estabelecimentos')
export class Estabelecimentos extends Identificadores {
  @Column()
  proprietariosId: number;

  @Column()
  uid: string;

  @Column()
  nome: string;

  @Column()
  CEP: string;

  @Column()
  complemento: string;

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
  tema: string;

  @Column({ default: 'logoEstabelecimento.png' })
  imageUrl: string;

  @Column({ default: true })
  visivel: boolean;

  @ManyToOne(() => Proprietarios, (prop) => prop.estabelecimentos, {
    cascade: true,
  })
  @JoinColumn()
  proprietarios: Proprietarios;

  @OneToMany(
    () => HorariosEstabelecimento,
    (horario) => horario.estabelecimento,
    { eager: true },
  )
  @JoinColumn()
  horarios: HorariosEstabelecimento[];
}
