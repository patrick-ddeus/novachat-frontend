import { useState } from 'react';
import { ZodError, ZodObject, ZodEffects } from 'zod';

interface Options<T> {
  initialValues: T;
  schema: ZodEffects<ZodObject<any, any, any>> | ZodObject<any, any, any>;
  onSubmit?: (data: T) => void;
}

export function useForm<T>(options: Options<T>) {
  const [data, setData] = useState<T>(options?.initialValues || ({} as T));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setData({
        ...data,
        [key]: value,
      });
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      options.schema.parse(data);

      setErrors({});
      if (options?.onSubmit) {
        options.onSubmit(data);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            validationErrors[err.path[0]] = err.message;
          }
        });

        setErrors(validationErrors);
      }
    }
  };

  return {
    setData,
    data,
    handleChange,
    handleSubmit,
    errors,
  };
}
