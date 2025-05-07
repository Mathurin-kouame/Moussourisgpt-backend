import { Body, Controller, Post } from '@nestjs/common';
import { JoueursService } from './joueurs.service';
import { CreateJoueurDto,} from './create_joueur.Dto';

@Controller('joueurs')
export class JoueursController {
    
  constructor(private joueurServices:JoueursService){

  }
    @Post("/create")
    createJoueur(@Body() req: CreateJoueurDto){
        console.log(req);
    return this.joueurServices.createJoueur(req);
    }
    
}
