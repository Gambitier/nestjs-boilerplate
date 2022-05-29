import * as generator from 'generate-password';

export const generatePassword = () => {
  const pass = generator.generate({
    length: 10,
    numbers: true,
    lowercase: true,
    uppercase: true,
    symbols: true,
  });
  return pass;
};
