const ControllerHook = {
  ON_REQUEST: 'onRequest',
  PRE_PARSING: 'preParsing',
  PRE_VALIDATION: 'preValidation',
  PRE_HANDLER: 'preHandler',
  HANDLER: 'handler',
  PRE_SERIALIZATION: 'preSerialization',
  ON_ERROR: 'onError',
  ON_SEND: 'onSend',
  ON_RESPONSE: 'onResponse',
  ON_TIMEOUT: 'onTimeout'
} as const;

export { ControllerHook };
