import { Injectable } from '@nestjs/common';
import { Customer } from '../customer/model/customer.model';
import { MailerService } from '@nestjs-modules/mailer';
import { Admin } from '../admin/model/admin.model';
import { Worker } from '../workers/model/worker.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendCustomerConfirmation(customer: Customer): Promise<void> {
    const url = `${process.env.API_HOST}/api/customer/activate/${customer.active_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: customer.email,
      subject: 'Welcom to Cleaning service! Confirm your Email',
      template: './confirmation',
      context: {
        name: customer.first_name,
        url,
      },
    });
  }

  async sendWorkerConfirmation(worker: Worker): Promise<void> {
    const url = `${process.env.API_HOST}/api/worker/activate/${worker.active_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: worker.email,
      subject: 'Welcom to Cleaning service! Confirm your Email',
      template: './confirmation',
      context: {
        name: worker.first_name,
        url,
      },
    });
  }

  async sendAdminConfirmation(admin: Admin): Promise<void> {
    const url = `${process.env.API_HOST}/api/admin/activate/${admin.active_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Welcom to Cleaning service! Confirm your Email',
      template: './confirmation',
      context: {
        name: admin.email,
        url,
      },
    });
  }
}
