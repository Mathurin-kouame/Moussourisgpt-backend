import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/Dto/create_user.dto';
import { ConnexionUserDto } from './connexion-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    createUser(userData: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    connexionUser(userData: ConnexionUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    otpVerify(dataUser: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
