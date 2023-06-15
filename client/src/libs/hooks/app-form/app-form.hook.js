import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';

import { UseFormMode } from '~/libs/enums/enums.js';

const useAppForm = ({ validationSchema, defaultValues, mode }) => {
  const {
    control,
    formState: { errors },
    reset,
    watch,
    handleSubmit
  } = useForm({
    defaultValues,
    resolver: validationSchema ? joiResolver(validationSchema) : undefined,
    mode: mode ?? UseFormMode.ON_SUBMIT
  });

  return {
    control,
    errors,
    reset,
    watch,
    handleSubmit
  };
};

export { useAppForm };
