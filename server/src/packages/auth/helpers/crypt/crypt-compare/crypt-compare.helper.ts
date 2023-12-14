import { compare } from 'bcrypt';

const cryptCompare = (data: string, encrypted: string): Promise<boolean> => {
  return compare(data, encrypted);
};

export { cryptCompare };
