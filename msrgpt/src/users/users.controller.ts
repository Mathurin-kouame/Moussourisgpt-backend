import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { CreateUserDto } from './Dto/create_user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './Dto/update-user.dto';
import { Response } from "express";

@Controller('users')
export class UsersController {
     constructor(private usersService: UsersService){}


    @Post('create/user')
    createUser(@Body() user: CreateUserDto, @Res() res: Response){
       return this.usersService.createUser(user, res);
    }

    @Get('all')
    getAllUser(){
          return  this.usersService.getAllUser();
    }

    @Put('update/profile')
    updateProfile(@Body() userData: UpdateUserDto){
      console.log(userData);
       return this.usersService.updateProfile(userData);
    }

    @Delete('delete/profile/:id')
    deleteProfile(@Param('id') idUsers : string) {
      console.log(idUsers)

      return this.usersService.deleleProfile(idUsers);
    }


    


}
