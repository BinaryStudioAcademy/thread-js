import { dayjs } from '../dayjs/dayjs';

const getFromNowTime = date => dayjs(date).fromNow();

export { getFromNowTime };
