import { IsEmail, IsMobilePhone, IsNotEmpty, IsString} from "class-validator";

export class UpdateUserDto{
    @IsString()
    fullname?:string; 

    @IsString()
    pseudo?:string;

    @IsEmail()
    email?:string;
    
    @IsMobilePhone()
    telNumber?:string;

    @IsString()
    @IsNotEmpty()
    idUsers: string;
}