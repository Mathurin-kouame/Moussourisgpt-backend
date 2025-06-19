import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpeniaController } from './openai.controller';
import OpenAI from 'openai';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prompt } from 'src/prompts/prompt.entity';
import { User } from 'src/users/user.entity';
import { PromptUsage } from 'src/prompts/prompt_usage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prompt,User,PromptUsage]), //  le module TypeOrm pour la gestion des entités
  ],
  providers: [OpenaiService, OpenAI],
  controllers: [OpeniaController]
})
export class OpeniaModule {}
