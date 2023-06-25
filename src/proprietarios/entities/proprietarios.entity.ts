import { Estabelecimentos } from './../../estabelecimento/entities/estabelecimento.entity';
import Pessoa from 'src/class/Pessoa';
import { Entity, OneToMany, JoinColumn, Column } from 'typeorm';

@Entity('Proprietarios')
export class Proprietarios extends Pessoa {
  @Column({ default: 'propAvatar.png' })
  urlFoto: string;

  @Column()
  tokenRecuperar: string;

  @OneToMany(
    () => Estabelecimentos,
    (estabelecimento) => estabelecimento.proprietarios,
  )
  @JoinColumn()
  estabelecimentos: Estabelecimentos[];
}
