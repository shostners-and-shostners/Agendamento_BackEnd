import Pessoa from 'src/class/Pessoa';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Proprietarios')
export class Proprietarios extends Pessoa {}
