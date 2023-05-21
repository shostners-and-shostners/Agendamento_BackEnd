import Identificadores from 'src/class/Identificadores';
import { Estabelecimentos } from 'src/estabelecimento/entities/estabelecimento.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('horarios_estabelecimento')
export class HorariosEstabelecimento extends Identificadores {
  @Column({ length: 100 })
  diaSemana: string;

  @Column({ length: 10 })
  inicio: string;

  @Column({ length: 10 })
  fim: string;

  @ManyToOne(() => Estabelecimentos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'estabelecimentosId' })
  estabelecimento: Estabelecimentos;
}
