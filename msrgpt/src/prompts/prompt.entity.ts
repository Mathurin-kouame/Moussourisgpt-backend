import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Prompt {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    message: string;

    @Column({nullable:true})
    reponse: string;

    

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at: string;
    
    @ManyToMany(()=> User, (user) =>user.prompts)
    user:User

    

}