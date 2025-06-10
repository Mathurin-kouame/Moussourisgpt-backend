import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './Dto/create_user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'; // security 
import { UpdateUserDto } from './Dto/update-user.dto';
import { Response } from "express";


@Injectable()
export class UsersService {

    constructor(@InjectRepository(User)
    private  readonly userRepository: Repository<User>){}

    async createUser(userData: CreateUserDto, res: Response){

        //verification
        if (!userData.email.includes('@gmail.com')) {
            console.log(userData.email);
            return res.status(HttpStatus.BAD_REQUEST).json({
                error : true,
                message: "uniquement des emails de gmail "
            })  
        }

        try {
            const verifyEmail = await this.userRepository.findOne({where:{
                email: userData.email
            }})

            console.log("user verify", verifyEmail);

            if (verifyEmail) {
                return res.status(HttpStatus.CONFLICT).json({
                    error: true,
                    message:"votre email existe déjà"
                })
            }

            const verifyPseudo = await this.userRepository.findOne({where: {
                pseudo: userData.pseudo
            }})
            console.log("user verify pseudo",verifyPseudo);
            if (verifyPseudo) {
                return res.status(HttpStatus.CONFLICT).json({
                    error: true,
                    message:" votre pseudo existe déjà"
                })
            }

        // if (verifyUser?.email  === userData.email || verifyUser?.password){}

            //harché de mon de password
                const saltOrRounds = 10;
                console.log('send password:', userData.password);

                const password = userData.password;
                const hash = await bcrypt.hash(password, saltOrRounds);
                userData.password = hash;

                console.log('password hash', userData.password);

                const dataSave = await this.userRepository.save(userData);

                if (!dataSave) {
                    console.log(dataSave);
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error:true,
                        message: `Erreur suvenue lors de l'enregistrement de la base de données`
                    })
                    
                }
                return res.status(HttpStatus.OK).json({
                    error: false,
                    message:"Données enregistrés avec sucès!",
                    data: dataSave
                })

        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: true,
                message: `Erreur souvenue: ${error.message}` 
            })
        }

    }

    async getAllUser(){

        const dataUsers = await this.userRepository.find();
        const countUser = await this.userRepository.count();

        return {
                error: false,
                message: "Valeur enregistrée avec succès",
                data: dataUsers,
                nbUsers: countUser
            }
    }

    async updateProfile(userData: UpdateUserDto, res: Response){

        const dataUser = await this.userRepository.findBy({id: userData.idUsers});
        //const dataUser = await this.userRepository.findOneBy({id: userData.idUsers});
        
        
        console.log(dataUser);
        //console.log(dataUser[0]);
        //dataUser?:fullName = userData.fullname

        //verification de user
        dataUser[0].fullName = userData.fullname ?? dataUser[0].fullName;
        dataUser[0].pseudo = userData.pseudo ?? dataUser[0].pseudo;
        dataUser[0].email = userData.email ?? dataUser[0].email;
        dataUser[0].telNumber = userData.telNumber ?? dataUser[0].telNumber;

        const saveData = await this.userRepository.save(dataUser[0]);

        return res.status(HttpStatus.OK).json({   
            error:false,
            message: "utilisateur mise à jour avec succès!",
            data: saveData
    }) 
          
    }

    
    async deleteProfile(idUsers: string){
        const deleteProfile = await this.userRepository.delete({id: idUsers});

        console.log("Utilisateur supprimé: ", deleteProfile);
        return {
            error: false,
            message: "Utilisateurs supprimé avec succes"
        }
    }
    
}
