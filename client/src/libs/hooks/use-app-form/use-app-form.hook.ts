import { joiResolver } from '@hookform/resolvers/joi';
import {
  type Control,
  type DefaultValues,
  type FieldErrors,
  type FieldValues,
  useForm,
  type UseFormHandleSubmit,
  type UseFormProps,
  type UseFormReset,
  type UseFormSetValue,
  type UseFormWatch,
  type ValidationMode
} from 'react-hook-form';

import { type ValidationSchema } from '~/libs/types/types.js';

type Parameters<T extends FieldValues = FieldValues> = {
  defaultValues: DefaultValues<T>;
  validationSchema?: ValidationSchema;
  mode?: keyof ValidationMode;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
  reset: UseFormReset<T>;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  control: Control<T, null>;
  errors: FieldErrors<T>;
  isValid: boolean;
  isDirty: boolean;
  handleSubmit: UseFormHandleSubmit<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
  defaultValues,
  mode = 'onSubmit',
  validationSchema
}: Parameters<T>): ReturnValue<T> => {
  let parameters: UseFormProps<T> = {
    mode,
    defaultValues
  };

  if (validationSchema) {
    parameters = {
      ...parameters,
      resolver: joiResolver(validationSchema)
    };
  }

  const {
    reset,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty }
  } = useForm<T>(parameters);

  return {
    reset,
    control,
    errors,
    isValid,
    isDirty,
    setValue,
    handleSubmit,
    watch
  };
};

export { useAppForm };
