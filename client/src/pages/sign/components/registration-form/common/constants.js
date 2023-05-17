import { UserPayloadKey } from 'libs/enums/enums';

const DEFAULT_REGISTRATION_PAYLOAD = {
  [UserPayloadKey.USERNAME]: '',
  [UserPayloadKey.EMAIL]: '',
  [UserPayloadKey.PASSWORD]: ''
};

export { DEFAULT_REGISTRATION_PAYLOAD };
