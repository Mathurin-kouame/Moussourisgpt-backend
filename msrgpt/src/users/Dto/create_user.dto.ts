import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    pseudo: string;
    
    
    @IsNotEmpty()
    @IsString()
    password: string;

    //@IsMobilePhone()
    //telNumber: string;
}