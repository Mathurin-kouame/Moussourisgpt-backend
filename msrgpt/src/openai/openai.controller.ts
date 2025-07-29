import { Body, Controller, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { DatapromptDto } from './dto/data-prompt.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';




enum Option {
    Scan = "Scan",
    Footprint = "Footprint",
    Enum = "Enum"
}

type Options = "Scan" | "Footprint" | "Enum";


@Controller('openai')
export class OpeniaController {
    constructor(private readonly openaiService: OpenaiService){}


    @UseGuards(JwtAuthGuard)
    @Post('/chat')
    async sendPrompt(@Body() dataPrompt:DatapromptDto, @Res() res:Response,@Request() req){

        try {

            console.log(dataPrompt);
            console.log(Option.Scan.toString());

            if (dataPrompt.option != Option.Scan.toString() 
                && dataPrompt.option != Option.Footprint.toString()
                && dataPrompt.option != Option.Enum.toString()) {
                console.log("erreur de saisir")
                return res.status(HttpStatus.BAD_REQUEST).json({
                    error:true,
                    message: "erreur de saisir, veillez rentrer l'un de ces mots: Scan, Footprint, enum"
                })
            }

            let DataPromptOption;

            if (dataPrompt.option == "Scan") {
                DataPromptOption = "faire un scanning"
            } 
            else if (dataPrompt.option == "fooprint") {
                DataPromptOption = " faire un Footprinting"
            }
            else if (dataPrompt.option == "Enum") {
                DataPromptOption = "faire une enumeration"
            }


            const fullPrompt = `Option sélectionnée : ${DataPromptOption}. Action : ${dataPrompt.prompt}.\nRetourne uniquement la commande à exécuter sans aucun commentaire ni explication.`;
            return this.openaiService.sendPrompt(fullPrompt, req.user.userId)
        
            
        } catch (error) {
            console.error("Erreur lors de l'envoi du pompt:", error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Echec d'envoi du prompt"});
        }
    }
}
