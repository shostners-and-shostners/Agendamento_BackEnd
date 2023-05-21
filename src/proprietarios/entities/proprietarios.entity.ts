import { Estabelecimentos } from './../../estabelecimento/entities/estabelecimento.entity';
import Pessoa from 'src/class/Pessoa';
import { Entity, OneToMany, JoinColumn } from 'typeorm';

@Entity('Proprietarios')
export class Proprietarios extends Pessoa {
  @OneToMany(
    () => Estabelecimentos,
    (estabelecimento) => estabelecimento.proprietarios,
  )
  @JoinColumn()
  estabelecimentos: Estabelecimentos[];
}
