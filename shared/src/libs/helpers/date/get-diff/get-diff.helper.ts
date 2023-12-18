import { dayjs } from '../dayjs/dayjs.js';

const getDiff = (a: Date | string, b: Date | string): number => {
  return dayjs(a).diff(b);
};

export { getDiff };
