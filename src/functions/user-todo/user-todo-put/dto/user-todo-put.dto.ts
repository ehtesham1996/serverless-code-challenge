import { z } from 'zod';

export const userTodoPutDTO = z.object({
  userId: z.string().uuid(),
  title: z.string(),
  description: z.string()
});

export type userTodoPutDTO = z.infer<typeof userTodoPutDTO>;
