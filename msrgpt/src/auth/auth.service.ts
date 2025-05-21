import { Body, HttpStatus, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // security 
import { User } from 'src/users/user.entity';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
 
    constructor(@InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService){}
        
//generate of code OTP
 generateOtp(length: number =6):string{
    let codeOtp ="";

    for (let i = 0; i<length; i++) {
       codeOtp += Math.floor(Math.random()*10)
        
    }
  return codeOtp;
}

async verifyOTP(codeOTP:string, email: string, res: Response){
    
    if (!email.endsWith('@gmail.com')) {
        console.log(email);
        return res.status(HttpStatus.BAD_REQUEST).json({
            error:true,
            message: "uniquement des @gmails"
        })
    }

    try {
        const userVerify = await this.userRepository.findOne({where: {email}});

        if (!userVerify) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                error:true,
                message: "ce email que vous avez fourni est invalide !"
            })
        }

        if (userVerify.codeOTP !== codeOTP) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                error: true,
                message: "le code OTP est invalide !"
            })
        }

        const updateData = this.userRepository.update(userVerify.id, {

            emailVerify: true,
            codeOTP: ""
        })

        if (!updateData) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: true,
                message: "une erreur est souvenue !"
            })
        }

        return res.status(HttpStatus.OK).json({
            error: false,
            message: "Verification effectuée avec succès."
        })

    } catch (error) {
        console.log(error);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: `Erreur survenu: ${error.message}`
        })
    }
}

//create new user
        async createUser(fullName:string, pseudo: string, password:string, email: string, res:Response){

            if (!email.endsWith('@gmail.com')) {
                console.log(email);
            return res.status(HttpStatus.BAD_REQUEST).json({
                error:true,
                message: "uniquement des emails de gmail"
        })
    }

            try {
                const verifyUser = await this.userRepository.findOne({where: {fullName: fullName}});
                console.log("user verify:", verifyUser)

                if (verifyUser) {
                    return res.status(HttpStatus.CONFLICT).json({
                        error: true,
                        massege: "user existe déjà"
                    })
                }

                const verifyEmail = await this.userRepository.findOne({where: {email}});

                console.log("email verify: ", verifyEmail)



                if (verifyEmail) {
                    return res.status(HttpStatus.CONFLICT).json({
                        error: true,
                        message: "l' email existe déjà"
                    })

                }

                const verifyPseudo = await this.userRepository.findOne({where: {pseudo}});

                if (verifyPseudo) {
                    return res.status(HttpStatus.CONFLICT).json({
                        error: true,
                        message: "le pseudo est déjà utilisé"
                    })

                }
 //harché le password

                const saltOrRounds = 10;

                console.log('send password',password)
                const passwords = password;
                const hash = await bcrypt.hash(passwords, saltOrRounds);
                password = hash;

//call generateOtp
                const codeOTP = this.generateOtp();

                const saveData = this.userRepository.create({fullName, email, password, codeOTP });
                const saveUser = this.userRepository.save(saveData);

                if (!saveUser) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: true,
                        message: "Enregistrement non effectué !"
                    })
                }

                return res.status(HttpStatus.CREATED).json({
                    error: false,
                    message: "compte crée avec succès",
                    data: saveData
                })
            } catch (error) {
                console.log(error);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error : true,
                    message: "Uniquement des emails gmails"
                })
            }
        }
                    //login

        async login(email: string, password:string, res:Response){
            
            if (!email.endsWith('@gmail.com')) {

                console.log(email)
                return res.status(HttpStatus.BAD_REQUEST).json({
                    error: true,
                    message: "Nous acceptions uniquement des mails gmail"
                });
            };

            try {
                const verifyEmail = await this.userRepository.findOne({where:{email}});

                if (!verifyEmail) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: true,
                        message:" ce email n'existe pas"
                    })
                }

                const isMatch = await bcrypt.compare(password, verifyEmail.password);

                if (!isMatch) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: true,
                        message: "mot de passe incorrect"
                    });
                }

                //token
                const payload = {sub:verifyEmail.id, username: verifyEmail.pseudo};
                const token = await this.jwtService.signAsync(payload);

                return res.status(HttpStatus.OK).json({
                    error: false,
                    message: "connexion reussie !",
                    token: token
                })
            } catch (error) {
                console.log(error);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: true,
                    message: `Erreur survenu:${error.message}`
                })
            }
        }

        
}
