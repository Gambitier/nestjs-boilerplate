export const sanitizePhoneNumber = (phone: string) => {
  if (!phone) {
    return null;
  }
  return phone.replace(' ', '').replace('+91', '').replace('-', '').trim();
};
