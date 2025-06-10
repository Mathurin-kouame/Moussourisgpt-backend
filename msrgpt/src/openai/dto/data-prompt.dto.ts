import { IsNotEmpty, IsString } from "class-validator";

export class DatapromptDto {
    @IsNotEmpty()
    @IsString()
    options:String;

    @IsString()
    prompt:string;
}