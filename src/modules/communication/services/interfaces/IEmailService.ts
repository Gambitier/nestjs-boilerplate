export const IEmailService = Symbol('IEmailService');

export interface IEmailService {
  sendExampleEmail(): void;
  sendExampleEmail_2(): void;
  sendResetPasswordEmail(args: {
    action_url: string;
    email: string;
  }): Promise<boolean>;
}
