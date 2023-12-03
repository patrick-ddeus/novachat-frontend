import { z } from 'zod';

export const EditProfileSchema = z.object({
  username: z
    .string({
      invalid_type_error: 'Username must be a string',
    })
    .trim()
    .optional(),
  email: z
    .string({
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email address' })
    .trim()
    .optional(),
  aboutMe: z
    .string({
      invalid_type_error: 'About me must be a string',
    })
    .trim()
    .optional(),
});
