import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpeniaController } from './openai.controller';
import OpenAI from 'openai';

@Module({
  providers: [OpenaiService, OpenAI],
  controllers: [OpeniaController]
})
export class OpeniaModule {}
