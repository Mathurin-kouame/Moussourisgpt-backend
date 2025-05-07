import { Injectable } from '@nestjs/common';


@Injectable()
export class JoueursService {
    createJoueur(req: any){
        return {
            error: "pas d'erreur",
            reponse: 'succes !!!',
            data: req,
        }
    }
}
