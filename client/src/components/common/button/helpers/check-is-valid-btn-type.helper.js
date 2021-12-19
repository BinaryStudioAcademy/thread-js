import { ButtonType } from 'common/enums/enums';

const checkIsValidBtnType = type => Object.values(ButtonType).includes(type);

export { checkIsValidBtnType };
