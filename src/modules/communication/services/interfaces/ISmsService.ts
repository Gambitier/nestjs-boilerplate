export const ISmsService = Symbol('ISmsService');

export interface ISmsService {
  sendSMS(targetPhoneNumber: string, body: string);
}
