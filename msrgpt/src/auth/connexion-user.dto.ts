import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class ConnexionUserDto{

     @IsNotEmpty()
    @IsEmail()
    email: string;
   
    @IsNotEmpty()
    @IsString()
    password: string;

}