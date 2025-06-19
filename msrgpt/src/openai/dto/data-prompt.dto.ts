import { IsNotEmpty, IsString } from "class-validator";

export class DatapromptDto{
    @IsNotEmpty()
    @IsString()
    option:String;

    @IsNotEmpty()
    @IsString()
    prompt:string;
}