import { OpenaiService } from './openai.service';
import { DatapromptDto } from './dto/data-prompt.dto';
import { Response } from 'express';
export declare class OpeniaController {
    private readonly openaiService;
    constructor(openaiService: OpenaiService);
    sendPrompt(dataPrompt: DatapromptDto, res: Response, req: any): Promise<Response<any, Record<string, any>> | {
        error: boolean;
        message: string;
        prompt: string;
        data: string;
        limite: string;
    }>;
}
