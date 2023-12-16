import { dayjs } from '../dayjs/dayjs.js';

const getFromNowTime = (date: Date): string => dayjs(date).fromNow();

export { getFromNowTime };
