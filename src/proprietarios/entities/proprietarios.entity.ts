import Pessoa from 'src/class/Pessoa';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'proprietarios' })
export class teste {
  @Column()
  nome: string;
}
