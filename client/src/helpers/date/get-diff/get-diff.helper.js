import { dayjs } from '../dayjs/dayjs';

const getDiff = (a, b) => dayjs(a).diff(b);

export { getDiff };
