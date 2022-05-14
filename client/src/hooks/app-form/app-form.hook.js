import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

const useAppForm = ({ validationSchema, defaultValues }) => {
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm({
    defaultValues,
    resolver: validationSchema ? joiResolver(validationSchema) : undefined
  });

  return {
    control,
    errors,
    reset,
    handleSubmit
  };
};

export { useAppForm };
