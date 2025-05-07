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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'msrgpt1',
      password: 'msrgpt2025',
      database: 'msrgpt',
      entities: [User, Joueur],
      synchronize: true,
    }),
    JoueursModule,
    UsersModule,
  ],
  controllers: [AppController, JoueursController],
  providers: [AppService, JoueursService],
})
export class AppModule {}
