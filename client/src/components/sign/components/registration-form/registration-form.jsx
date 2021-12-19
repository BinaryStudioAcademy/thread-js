import PropTypes from 'prop-types';
import { useAppForm, useState } from 'hooks/hooks';
import {
  ButtonType,
  ButtonSize,
  ButtonColor,
  AppRoute,
  IconName,
  UserPayloadKey
} from 'common/enums/enums';
import {
  Button,
  FormInput,
  Message,
  NavLink,
  UiSegment
} from 'components/common/common';
import { registration as registrationValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_REGISTRATION_PAYLOAD } from './common/constants';
import styles from './styles.module.scss';

const RegistrationForm = ({ onRegister }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_REGISTRATION_PAYLOAD,
    validationSchema: registrationValidationSchema
  });

  const handleRegister = values => {
    setIsLoading(true);

    onRegister(values)
      .unwrap()
      .catch(() => {
        // TODO: show error
        setIsLoading(false);
      });
  };

  return (
    <>
      <h2 className={styles.title}>Register for free account</h2>
      <form
        name="registrationForm"
        onSubmit={handleSubmit(handleRegister)}
      >
        <UiSegment>
          <fieldset disabled={isLoading} className={styles.fieldset}>
            <FormInput
              name={UserPayloadKey.USERNAME}
              type="text"
              placeholder="Username"
              iconName={IconName.USER}
              control={control}
              errors={errors}
            />
            <FormInput
              name={UserPayloadKey.EMAIL}
              type="email"
              placeholder="Email"
              iconName={IconName.AT}
              control={control}
              errors={errors}
            />
            <FormInput
              name={UserPayloadKey.PASSWORD}
              type="password"
              placeholder="Password"
              iconName={IconName.LOCK}
              control={control}
              errors={errors}
            />
            <Button
              type={ButtonType.SUBMIT}
              color={ButtonColor.TEAL}
              size={ButtonSize.LARGE}
              isLoading={isLoading}
              isFluid
              isPrimary
            >
              Register
            </Button>
          </fieldset>
        </UiSegment>
      </form>
      <Message>
        <span>Already with us?</span>
        <NavLink to={AppRoute.LOGIN}>Sign In</NavLink>
      </Message>
    </>
  );
};

RegistrationForm.propTypes = {
  onRegister: PropTypes.func.isRequired
};

export default RegistrationForm;
