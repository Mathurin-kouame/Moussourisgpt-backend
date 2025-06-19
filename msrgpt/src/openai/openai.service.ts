import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OpenAI from 'openai';
import { Prompt } from 'src/prompts/prompt.entity';
import { PromptUsage } from 'src/prompts/prompt_usage.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';

@Injectable()
export class OpenaiService {
    private openai: OpenAI;
    private  promptNumber: number;

    constructor(
        @InjectRepository(Prompt)
        private readonly promptRepository: Repository<Prompt>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(PromptUsage)
        private readonly  usageRepository: Repository<PromptUsage>  
    ) {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.promptNumber = 0; // Initialisation du compteur de prompts
    }

    promptCompt(): number {
        return this.promptNumber + 1;
    }

    async sendPrompt(prompt: string,userId: string,res:Response) {
        try {

            //verifir si l'utilisateur existe
            const verifyUser = await this.userRepository.findOne({
                where: {id: userId},
            })

            if (!verifyUser){
                return res.status(HttpStatus.FORBIDDEN).json({
                    error: true,
                    message: "utilisateur non trouvé!"
                });
            }

            // verification d'utilisateur dans la table promptUsage
            let usage = await this.usageRepository.findOne({
                where: {
                    user: { id: userId },
                    date: new Date().toISOString().split('T')[0]
                },
                relations: ['user'] //assurez-vous de changer la relation user
            })
            // si l'utilisateur atteint la limite de prompt envoyez une erreur
            if (usage && usage.comptage_prompt >= 5) {
                return res.status(HttpStatus.FORBIDDEN).json({
                    error:true,
                    message: "vous avez atteint la limite de 5 prompts par jour!"
                });
            }

            const response = await this.openai.chat.completions.create({
                model: 'gpt-4.1', 
                messages: [{ role: 'user', content: prompt }],
            });

            if (!response.choices?.[0]?.message?.content) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error:true,
                    message: "reponse openia invalide"
                });
            }

            const aiResponse = response.choices[0].message.content;

            const newPrompt = this.promptRepository.create({
                message: prompt,
                reponse: aiResponse,
            });

            await this.promptRepository.save(newPrompt);
            if (usage) {
                usage.comptage_prompt += 1;
            }else{
                usage = this.usageRepository.create({
                    user: verifyUser,
                    date: new Date().toISOString().split('T')[0], //utiliser la date actuelle
                    comptage_prompt: 1,
                });
            }
            await this.usageRepository.save(usage);
            return res.status(HttpStatus.OK).json({
                error: false,
                message: "requete exécutée avec succès",
                Prompt: prompt,
                data: aiResponse,
                limite: `Vous avez utilisé ${usage.comptage_prompt} prompts aujourd'hui. Il vous reste ${5 - usage.comptage_prompt} prompts pour aujourd'hui.`,
            });
        } catch (error) {
            console.error('Erreur:', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: true,
                message: `Erreur: ${error.message}`
            });
           
            
        }
    }
}