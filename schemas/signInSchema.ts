import { z } from 'zod';

export const SignInSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: 'Email cant be empty',
      })
      .email({ message: 'Invalid email address' })
      .trim(),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .trim(),
  })
  .required();
