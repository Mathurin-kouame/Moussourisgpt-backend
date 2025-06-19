import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  constructor(private mailerService:MailerService ){}

  getHello(): string {
    return 'Hello World!';
  }

  async sendMail(to:string, codeOtp: string): Promise<void>{
    
    await this.mailerService.sendMail({
    
    from: 'noreply@sgppconseils.com',     
     to,
      subject: `Confimation code otp`,
      text: `votre code de confirmation est: ${codeOtp}`,
    })
   
  }
}
