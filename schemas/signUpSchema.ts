import { z } from 'zod';

export const SignUpSchema = z
  .object({
    username: z
      .string({
        required_error: 'Username is required',
        invalid_type_error: 'Username cant be empty',
      })
      .min(1, { message: 'Username must contain at least one character' })
      .trim(),
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
      .min(8, { message: 'Password must contain at least 8 characters' })
      .trim(),
    confirmPassword: z.string({
      required_error: 'Username is required',
      invalid_type_error: 'Password cant be empty',
    }),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
