import { dayjs } from '../dayjs/dayjs.js';

const getFromNowTime = date => dayjs(date).fromNow();

export { getFromNowTime };
