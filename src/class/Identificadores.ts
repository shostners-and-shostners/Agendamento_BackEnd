import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default abstract class Identificadores {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @CreateDateColumn({ type: 'timestamp', name: 'createdAt', select: false })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'updateAt', select: false })
  updateAt: string;
}
