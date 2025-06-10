import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { JoueursController } from './joueurs/joueurs.controller';
import { JoueursService } from './joueurs/joueurs.service';
import { JoueursModule } from './joueurs/joueurs.module';
import { Joueur } from './joueurs/joueur.entity';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { OpeniaController } from './openai/openai.controller';
import { OpenaiService } from './openai/openai.service';
import { Prompt } from './prompts/prompt.entity';
import { PromptUsage } from './prompts/prompt_usage.entity';
import OpenAI from 'openai';
import { OpeniaModule } from './openai/openai.module';



@Module({
  imports: [
   ConfigModule.forRoot({isGlobal: true,}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User,Prompt,PromptUsage,Joueur],
      synchronize: true,
    }),
    MailerModule.forRoot({transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),

    JoueursModule,
    UsersModule,
    AuthModule,
    OpeniaModule,
  ],
  controllers: [AppController, JoueursController],
  providers: [AppService, JoueursService],
})
export class AppModule {}
