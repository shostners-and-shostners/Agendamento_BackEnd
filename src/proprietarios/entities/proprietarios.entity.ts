import { Estabelecimentos } from './../../estabelecimento/entities/estabelecimento.entity';
import Pessoa from 'src/class/Pessoa';
import { Column, Entity, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';

@Entity('Proprietarios')
export class Proprietarios extends Pessoa {
  @OneToMany(
    () => Estabelecimentos,
    (estabelecimento) => estabelecimento.proprietarios,
  )
  @JoinColumn()
  estabelecimentos: Estabelecimentos[];
}
