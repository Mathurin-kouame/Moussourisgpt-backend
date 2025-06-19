import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PromptUsage {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({type: 'date'})
    date: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at: string;

  @Column({default:0})
    comptage_prompt: number;

    @ManyToOne(() => User, (user) => user.prompt_usage,{onDelete:"CASCADE"})
    user: User;
    
}