"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const app_service_1 = require("../app.service");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    appService;
    constructor(userRepository, jwtService, appService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.appService = appService;
    }
    generateOtp(length = 6) {
        let codeOtp = '';
        for (let i = 0; i < length; i++) {
            codeOtp += Math.floor(Math.random() * 10);
        }
        return codeOtp;
    }
    async verifyOTP(codeOtp, email, res) {
        if (!email.endsWith('@gmail.com')) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                error: true,
                message: "Uniquement des emails de gmail"
            });
        }
        try {
            const userVerify = await this.userRepository.findOne({ where: { email } });
            if (!userVerify) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    error: true,
                    message: "Mail fourni invalide !"
                });
            }
            if (userVerify.codeOtp !== codeOtp) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    error: true,
                    message: "le code otp est invalide"
                });
            }
            const updateData = this.userRepository.update(userVerify.id, {
                emailVerify: true,
                codeOtp: ""
            });
            if (!updateData) {
                return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: true,
                    message: "Une ereur est survenue !"
                });
            }
            return res.status(common_1.HttpStatus.OK).json({
                error: false,
                message: "verification effectuée avec succès."
            });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: true,
                message: `Erreur survenue: ${error.message}`
            });
        }
    }
    async createUser(fullName, pseudo, password, email, res) {
        if (!email.endsWith('@gmail.com')) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                error: false,
                message: "Entrer Uniquement des mails gmail !"
            });
        }
        try {
            const verifyEmail = await this.userRepository.findOne({ where: { email } });
            if (verifyEmail) {
                return res.status(common_1.HttpStatus.CONFLICT).json({
                    error: true,
                    message: " Compte existe déjà "
                });
            }
            const verifyPseudo = await this.userRepository.findOne({ where: { pseudo } });
            if (verifyPseudo) {
                return res.status(common_1.HttpStatus.CONFLICT).json({
                    error: true,
                    message: " Pseudo dejà utilisé"
                });
            }
            const saltOrRounds = 10;
            const passwords = password;
            const hash = await bcrypt.hash(passwords, saltOrRounds);
            const codeOtp = this.generateOtp();
            const dataSave = this.userRepository.create({ fullName, email, pseudo, password: hash, codeOtp });
            const saveUser = this.userRepository.save(dataSave);
            await this.appService.sendMail(email, codeOtp);
            if (!saveUser) {
                return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: true,
                    message: "Enregistrement non effectué"
                });
            }
            return res.status(common_1.HttpStatus.CREATED).json({
                error: false,
                message: 'Compte crée avec succès',
                data: dataSave
            });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: true,
                message: `erreur survenu: ${error.message}`
            });
        }
    }
    async connexionUser(email, password, res) {
        if (!email.endsWith('@gmail.com')) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                error: false,
                message: "Entrer Uniquement des mails gmail !"
            });
        }
        try {
            const verifyEmail = await this.userRepository.findOne({ where: { email } });
            if (!verifyEmail) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    error: true,
                    message: " Compte inexistant "
                });
            }
            const isMatch = await bcrypt.compare(password, verifyEmail.password);
            if (!isMatch) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                    error: true,
                    message: "mot de passe incorrect"
                });
            }
            const payload = { sub: verifyEmail.id, username: verifyEmail.pseudo };
            const token = await this.jwtService.sign(payload);
            return res.status(common_1.HttpStatus.OK).json({
                error: false,
                message: "Connexion reussie ",
                token: token
            });
        }
        catch (error) {
            console.log(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: true,
                message: `Erreur survenu: ${error.message}`
            });
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        app_service_1.AppService])
], AuthService);
//# sourceMappingURL=auth.service.js.map