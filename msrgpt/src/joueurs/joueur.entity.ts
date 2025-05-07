
import { max } from 'rxjs';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Joueur {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  nom: string;

  @Column()
  prenoms: string;

  @Column()
  age: number;

  @Column({default: null})
  lieu: string;

  @Column()
  equipe: string;

  @Column({ default: 'ivoirienne'})
  nationalite: string;

  @Column({ default:'gardien de but'})
  post: string;

  @Column({ type: 'varchar', length:10})
  telephone: string;

  @Column({ default: true })
  isActive: boolean;
}
