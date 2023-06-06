import Identificadores from 'src/class/Identificadores';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'CategoriaServico' })
export class Categoria extends Identificadores {
  @Column({ name: 'UIDEstabelecimento' })
  UIDEstabelecimento: string;

  @Column()
  nome: string;

  @Column({ default: true })
  ativo: boolean;
}
