import { z } from 'zod';

export const registerSchema = z.object(
    {
        name: z.string()
            .min(3, { message: 'Username must be greater than 5 characters' })
            .max(20, { message: 'Username must not be more than 20 characters' }),
        email: z.string().email('Invalid email'),
        password: z
            .string()
            .min(5, { message: 'Password must be greater than 5 characters' })
    }
);