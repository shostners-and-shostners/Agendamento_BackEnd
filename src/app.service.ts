import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AppService {
  constructor(private mailerService: MailerService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async sendEmail() {
    const mail = {
      to: 'jeancar1323@gmail.com',
      from: 'agendamento@snet.com',
      subject: 'Email de confirmação',
      template: './reset-pass',
      context: {
        token: 'user.confirmationToken',
      },
    };

    // const mail = {
    //   to: 'jeancar1323@gmail.com', // list of receivers
    //   from: 'agendamento@snet.com',
    //   subject: 'Testing Nest MailerModule ✔', // Subject line
    //   text: 'welcome', // plaintext body
    //   html: '<b>welcome</b>', // HTML body content
    // };

    return await this.mailerService.sendMail(mail);
  }
}
