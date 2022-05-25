import { dayjs } from '../dayjs/dayjs.js';

const getDiff = (a, b) => dayjs(a).diff(b);

export { getDiff };
