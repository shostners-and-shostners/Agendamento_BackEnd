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
      user: 'jeancar1323@gmail.com',
      pass: 'xsmtpsib-3419da85b0d1d6b3f596c3a266948d3b5e385abd4b94db3f8183e3b33155599b-BKYcELkI5dhJ6yzn',
    },
    // tls: {
    //   rejectUnauthorized: false,
    // },
  },
};
