import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { DatapromptDto } from './dto/data-prompt.dto';
import { Response } from 'express';

@Controller('openai')
export class OpeniaController {
    constructor(private readonly openaiService: OpenaiService){}
    @Post('/chat')
    async sendPrompt(@Body() dataPrompt:DatapromptDto, @Res() res:Response){

        try {

            const fullPrompt = `Option sélectionnée : ${dataPrompt.options}. Action : 
            ${dataPrompt.prompt}.\nRetourne uniquement la commande à exécuter sans aucun commentaire ni explication.`;

            const response = await this.openaiService.sendPrompt(fullPrompt);
            return res.status(HttpStatus.OK).json(response);
            
        } catch (error) {
            console.error("Erreur lors de l'envoi du pompt:", error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Echec d'envoi du prompt"});
        }
    }
}
