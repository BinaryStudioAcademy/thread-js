import { ButtonType } from 'common/enums/enums';

const isCorrectType = type => Object.values(ButtonType).includes(type);

export { isCorrectType };
