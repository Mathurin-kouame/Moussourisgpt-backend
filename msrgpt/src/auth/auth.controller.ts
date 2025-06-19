import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/Dto/create_user.dto';
import { ConnexionUserDto } from './connexion-user.dto';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('inscription')
    createUser(@Body() userData: CreateUserDto, @Res() res: Response){
        return this.authService.createUser(userData.fullName, userData.pseudo, userData.password, userData.email, res);
    }

    @Post('connexion')
    connexionUser(@Body() userData: ConnexionUserDto, @Res() res: Response ){
        return this.authService.connexionUser(userData.email, userData.password, res);
    }

    @Post('otp/verify')
    otpVerify(@Body() dataUser: string, @Res() res:Response){
        console.log("email", dataUser["email"])
        return this.authService.verifyOTP(dataUser["codeOtp"], dataUser["email"],res);
    }
    
}
