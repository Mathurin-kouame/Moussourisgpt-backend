import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/Dto/create_user.dto';
import { LoginDto } from './Dto/login.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('signup')
    createUser(@Body() userData: CreateUserDto, @Res() res: Response){

        return this.authService.createUser(userData.fullName, userData.pseudo, 
            userData.email, userData.pseudo, res);
    }

    @Post('login')
    login(@Body() userData: LoginDto, @Res() res: Response ){
        return this.authService.login(userData.email, userData.password, res);
    }

    @Post('otp/verify')
    otpVerify(@Body() dataUser: string, @Res() res:Response){
        console.log("email", dataUser["email"])
        return this.authService.verifyOTP(dataUser["codeOTP"], dataUser["email"],res);
    }
    
}
