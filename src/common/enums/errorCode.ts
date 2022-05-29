export enum ErrorCodeEnum {
  // Error server
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  //'Event is not exists',
  NOT_FOUND_EVENT = 'NOT_FOUND_EVENT',
  //'Event is not exists',
  NOT_FOUND_BANK = 'NOT_FOUND_BANK',
  // The number of ticket is over the available ticket or limit ticket.
  INVALID_NUMBER_TICKET = 'INVALID_NUMBER_TICKET',
  // Input data is invalid
  INVALID_DATA = 'INVALID_DATA',
}
