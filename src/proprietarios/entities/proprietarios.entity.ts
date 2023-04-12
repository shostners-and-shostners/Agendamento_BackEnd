import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Proprietarios')
export class Proprietarios {
  @PrimaryColumn()
  id: number;

  @Column()
  nome: string;
}
