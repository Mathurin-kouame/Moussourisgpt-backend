import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';
export declare class AuthService {
    private readonly userRepository;
    private jwtService;
    private appService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, appService: AppService);
    generateOtp(length?: number): string;
    verifyOTP(codeOtp: string, email: string, res: Response): Promise<Response<any, Record<string, any>>>;
    createUser(fullName: string, pseudo: string, password: string, email: string, res: Response): Promise<Response<any, Record<string, any>>>;
    connexionUser(email: string, password: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
