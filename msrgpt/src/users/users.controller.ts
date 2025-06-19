import { Body, Controller, Delete, Get, Param, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './Dto/create_user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './Dto/update-user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';



@Controller('users')
export class UsersController {

     constructor(private usersService: UsersService){}

    @Get('all')
    getAllUser(@Res() res: Response){
          return  this.usersService.getAllUser(res);
    }
  
    /*
    @Post('create/user')
    createUser(@Body() user: CreateUserDto, @Res() res: Response){
      return this.usersService.createUser(user, res);
    }
    */
    
     @UseGuards(JwtAuthGuard)// Permet d'avoir accès si tu es connecté
    @Get('user/info')// route
    getUser(@Request() req, @Res() res: Response){
      const userId = req.user.userId;

      console.log(req)
      return this.usersService.UserInfo(userId,res);
    }
    @UseGuards(JwtAuthGuard)
    @Put('update/profile')
    updateProfile(@Body() userData: UpdateUserDto, @Res() res: Response){
      console.log(userData)
       return this.usersService.updateProfile(userData, res);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/profile/:id')
    deleteProfile(@Param('id') idUsers: string) {
      console.log(idUsers)

      return this.usersService.deleteProfile(idUsers);
    }


    


}
