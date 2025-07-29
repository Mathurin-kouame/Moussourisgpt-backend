import { CreateUserDto } from './Dto/create_user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './Dto/update-user.dto';
import { Response } from "express";
export declare class UsersService {
    private readonly userRepository;
    findById(id: string): void;
    constructor(userRepository: Repository<User>);
    createUser(userData: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllUser(res: Response): Promise<Response<any, Record<string, any>>>;
    UserInfo(userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateProfile(userData: UpdateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteProfile(idUsers: string): Promise<{
        error: boolean;
        message: string;
    }>;
}
