import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IEmailService } from './interfaces/IEmailService';

@Injectable()
export class EmailService implements IEmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendExampleEmail() {
    this.mailerService
      .sendMail({
        to: 'testemailserviceslab@yopmail.com', // list of receivers
        from: 'noreply@yopmail.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then(() => console.log('sent email'))
      .catch((error) => console.error(error));
  }

  sendExampleEmail_2() {
    const user = {
      // Data to be sent to template engine.
      userName: 'Jack',
      userCategory: 'Captain',
      shipName: 'Test ship',
      firstName: 'John',
      lastName: 'Doe',
      data: [
        {
          name: 'Xyz ',
          type: 'Oil1',
          grade: 'DMA',
          qty: '10',
          price: '1000',
        },
        {
          name: 'Xyz ',
          type: 'Oil2',
          grade: 'DMC',
          qty: '20',
          price: '3000',
        },
        {
          name: 'Xyz ',
          type: 'Oil3',
          grade: 'DMX',
          qty: '10',
          price: '2000',
        },
      ],
      acceptUrl: 'http://localhost:3000/hbs_sample/acceptUrl',
      rejectUrl: 'http://localhost:3000/hbs_sample/rejectUrl',
    };

    this.mailerService
      .sendMail({
        to: 'testemailserviceslab@yopmail.com',
        subject: 'Testing Nest Mailermodule with template ✔',
        template: 'sample', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
        context: user,
      })
      .then(() => console.log('templated sent email'))
      .catch((error) => console.error(error));
  }

  async sendResetPasswordEmail(args: {
    action_url: string;
    email: string;
  }): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: args.email,
        subject: 'Reset Password',
        template: 'reset-password',
        context: {
          action_url: args.action_url,
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
