import { UserPayloadKey } from 'libs/enums/enums';

const DEFAULT_LOGIN_PAYLOAD = {
  [UserPayloadKey.EMAIL]: '',
  [UserPayloadKey.PASSWORD]: ''
};

export { DEFAULT_LOGIN_PAYLOAD };
