import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailerConfig: MailerOptions = {
  template: {
    dir: process.cwd() + '/templates/',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
  //transport: `smtps://reciclalog@reciclalog.com:Recicla@123@reciclalog.com`,
  transport: {
    //pool: true,
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    // ignoreTLS: false,
    // secure: true,
    auth: {
      user: process.env.EMAILLOGIN,
      pass: process.env.EMAILSENHA,
    },
    // tls: {
    //   rejectUnauthorized: false,
    // },
  },
};
