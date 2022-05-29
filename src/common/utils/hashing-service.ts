import * as bcrypt from 'bcrypt';

export function hashData(data: string | Buffer): string {
  const hash = bcrypt.hashSync(data, bcrypt.genSaltSync(8));
  return hash;
}

export const compareHash = (
  data: string | Buffer,
  encrypted: string,
): boolean => {
  return bcrypt.compareSync(data, encrypted);
};
