import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PromptUsage {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.prompt_usage)
    user: User;
    
    @Column({default:0})
    comptage_prompt:number;

    @Column({type: 'datetime', default: () =>'CURRENT_TIMESTAMP'})
    created_at:string

}