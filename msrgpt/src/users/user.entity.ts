
import { Prompt } from 'src/prompts/prompt.entity';
import { PromptUsage } from 'src/prompts/prompt_usage.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({type: 'varchar',length: 10,unique: true})
  pseudo: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  telNumber: string;

  @Column({default:0})
   countPromptDay: number;

   @Column({nullable:true})
   lastPromptDate: Date;

   //deux propriety otp
   @Column({default:false})
   emailVerify: boolean;

   @Column({nullable:true})
   codeOtp : string;
   
  @Column({type: 'datetime',default: ()=> 'CURRENT_TIMESTAMP'})
  created_at: string;

  @Column({ default:false})
  isActive: boolean;

  @OneToMany(() => Prompt, (prompt) => prompt.user)
    prompt: Prompt[]

  
   @OneToMany(() => PromptUsage, (prompt_usage) => prompt_usage.user)
   prompt_usage: PromptUsage[];
  
}
