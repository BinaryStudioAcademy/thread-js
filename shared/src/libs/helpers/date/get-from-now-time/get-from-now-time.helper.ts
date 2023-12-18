import { dayjs } from '../dayjs/dayjs.js';

const getFromNowTime = (date: Date | string): string => dayjs(date).fromNow();

export { getFromNowTime };
