import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './Dto/create_user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'; // security 
import { UpdateUserDto } from './Dto/update-user.dto';



@Injectable()
export class UsersService {

    constructor(@InjectRepository(User)
    private  readonly userRepository: Repository<User>){}
    async createUser(userData: CreateUserDto, res: Response){


        //verification

        if (!userData.email.includes('@gmail.com')) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                error : true,
                message: "uniquement des emails de gmail "
            })
        }

        const verifyUser = await this.userRepository.findOne({where:{
            email:userData.email
        }})

        if (verifyUser?.email  === userData.email || verifyUser?.password) {
            
        }



        //code copier
    const saltOrRounds = 10;
    const password = userData.password
    const hash = await bcrypt.hash(password, saltOrRounds);

    userData.password = hash;

    console.log('password hash', userData.password);

    const dataSave = await this.userRepository.save(userData)


        return {
            error: false,
            message: " Données enregistrées avec succès !",
            data: dataSave
        }
    }

    async getAllUser(){
        const dataUsers = await this.userRepository.find();
        const countUser = await this.userRepository.count();

        return {
            error: false,
            message: " Données enregistrées avec succès !",
            data: dataUsers,
            nbUsers: countUser
        }
    }

    async updateProfile(userData: UpdateUserDto){
        const dataUser = await this.userRepository.findBy({id: userData.idUsers});
        //const dataUser = await this.userRepository.findOneBy({id: userData.idUsers});

        console.log(dataUser);
        //console.log(dataUser[0]);

        //dataUser?:fullName = userData.fullname

        dataUser[0].fullName = userData.fullname ?? dataUser[0].fullName;
        dataUser[0].pseudo = userData.pseudo ?? dataUser[0].pseudo;
        dataUser[0].email = userData.email ?? dataUser[0].email;
        dataUser[0].telNumber = userData.telNumber ?? dataUser[0].telNumber;

        const saveData = await this.userRepository.save(dataUser[0]);

        return {
            error:false,
            message: "utilisateur mise à jour avec succès!",
            data: saveData
        }


    }

    async deleleProfile(idUsers: string){
           const deleleProfile = await this.userRepository.delete({id: idUsers});

           console.log("user supprimé:");

           return {
            error : false,
            message: " user supprimé avec succès!"
           }
    }
    
}
