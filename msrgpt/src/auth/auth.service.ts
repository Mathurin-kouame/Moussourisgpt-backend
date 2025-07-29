import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AppService } from 'src/app.service';

@Injectable()

export class AuthService {

    constructor(@InjectRepository(User)
       private readonly userRepository: Repository<User>,
       private jwtService: JwtService,
       private appService: AppService){}
       


        generateOtp(length: number = 6): string {

            let codeOtp = '';

            for( let i=0; i< length; i++){
                codeOtp += Math.floor(Math.random() * 10)

            }
            return codeOtp;
        } 
           

        async verifyOTP( codeOtp: string, email: string, res: Response){


            if(!email.endsWith('@gmail.com')){
                return res.status(HttpStatus.BAD_REQUEST).json({
                    error: true,
                    message: "Uniquement des emails de gmail"
                })
            }
          try { 
                const userVerify = await this.userRepository.findOne({where: {email}});

                if(!userVerify){
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: true,
                        message : "Mail fourni invalide !"
                    })
                }
                 
                if(userVerify.codeOtp !== codeOtp){
                   return res.status(HttpStatus.BAD_REQUEST).json({
                        error: true,
                        message: "le code otp est invalide"
                    })
                }


                const updateData = this.userRepository.update(userVerify.id,{
                    emailVerify: true,
                    codeOtp: ""

                })

                if(!updateData){
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error:true,
                        message: "Une ereur est survenue !"
                    })

                }

                    return res.status(HttpStatus.OK).json({
                        error: false,
                        message: "verification effectuée avec succès."
                    })



          } catch (error) {
            console.log(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: true,
                message: `Erreur survenue: ${error.message}`
            })
            
          }
        }

      async  createUser(fullName: string, pseudo: string,  password: string, email: string, res:Response ){

            if(!email.endsWith('@gmail.com')){
            
                return res.status(HttpStatus.BAD_REQUEST).json({
                    error: false,
                    message:"Entrer Uniquement des mails gmail !"
                });

            }

            try {
                const verifyEmail = await this.userRepository.findOne({where:{email}});
                
                if(verifyEmail){
                   return res.status(HttpStatus.CONFLICT).json({
                    error: true,
                    message: " Compte existe déjà "
                   })
                }

                const verifyPseudo = await this.userRepository.findOne({where:{pseudo}})

                if(verifyPseudo){

                    return res.status(HttpStatus.CONFLICT).json({
                        error: true,
                        message: " Pseudo dejà utilisé" 
                       })
                }

                const saltOrRounds = 10;
                const passwords = password;
                const hash = await bcrypt.hash(passwords, saltOrRounds);

                const codeOtp = this.generateOtp();
                const dataSave =  this.userRepository.create({fullName,email,pseudo,password: hash, codeOtp});
               
                const saveUser = this.userRepository.save(dataSave);  // await ajouter 

                await this.appService.sendMail(email, codeOtp);

                if(!saveUser){
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: true,
                        message: "Enregistrement non effectué"
                    })
                }
                
                return res.status(HttpStatus.CREATED).json({
                    error:false,
                    message:'Compte crée avec succès',
                    data: dataSave
                })
            } catch (error) {
                console.log(error);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: true,
                    message: `erreur survenu: ${error.message}`
                })
                
            }
         
        }

        async connexionUser(email: string, password: string, res: Response){


            if(!email.endsWith('@gmail.com')){
            
                return res.status(HttpStatus.BAD_REQUEST).json({
                    error: false,
                    message: "Entrer Uniquement des mails gmail !"
                })
            }

            try {
                
                const verifyEmail = await this.userRepository.findOne({where:{email}});

                if(!verifyEmail){
                    return res.status(HttpStatus.BAD_REQUEST).json({
                     error: true,
                     message: " Compte inexistant "
                    })
                 }

                    const isMatch = await bcrypt.compare(password, verifyEmail.password);

                    if(!isMatch){
                        return res.status(HttpStatus.BAD_REQUEST).json({
                        error: true,
                        message: "mot de passe incorrect"
                        })
                    }

                    const payload = { sub: verifyEmail.id, username: verifyEmail.pseudo };
                    const token = await this.jwtService.sign(payload);

                    return res.status(HttpStatus.OK).json({
                        error: false,
                        message: "Connexion reussie ",
                        token: token

                    })
               
            } catch (error) {
                console.log(error);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                   error: true,
                   message: `Erreur survenu: ${error.message}`
                })
            }
        }
}