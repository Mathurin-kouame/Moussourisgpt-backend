
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  //@Column()
  //lastName: string;
   
  @Column({type: 'varchar', 
    length: 10, 
    unique: true
  })
  pseudo: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true
  })
  telNumber: string;

  @Column({ 
    default: true 
  })
  isActive: boolean;
  
  @Column({
    type: 'datetime',
     default: ()=> 'CURRENT_TIMESTAMP'
    })
  created_at: string;

}
