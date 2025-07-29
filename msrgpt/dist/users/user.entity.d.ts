import { Prompt } from 'src/prompts/prompt.entity';
import { PromptUsage } from 'src/prompts/prompt_usage.entity';
export declare class User {
    id: string;
    fullName: string;
    pseudo: string;
    email: string;
    password: string;
    telNumber: string;
    countPromptDay: number;
    lastPromptDate: Date;
    emailVerify: boolean;
    codeOtp: string;
    created_at: string;
    isActive: boolean;
    prompt: Prompt[];
    prompt_usage: PromptUsage[];
}
