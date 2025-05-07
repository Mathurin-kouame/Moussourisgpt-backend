import {IsInt, IsNotEmpty, IsString} from "class-validator"

export class CreateJoueurDto{
    @IsNotEmpty()
    @IsString()
    nom: string;

    @IsNotEmpty()
    @IsString()
    prenoms: string;

    @IsNotEmpty()
    @IsInt()
    age: number;

    @IsNotEmpty()
    @IsString()
    equipe: string;

    @IsNotEmpty()
    @IsInt()

    telephone: string;



}