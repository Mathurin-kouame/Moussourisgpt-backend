import { UsersService } from './users.service';
import { UpdateUserDto } from './Dto/update-user.dto';
import { Response } from 'express';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAllUser(res: Response): Promise<Response<any, Record<string, any>>>;
    getUser(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    updateProfile(userData: UpdateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteProfile(idUsers: string): Promise<{
        error: boolean;
        message: string;
    }>;
}
