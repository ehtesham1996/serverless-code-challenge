import { z } from 'zod';

export const userTodoPostDTO = z.object({
  userId: z.string().uuid(),
  title: z.string(),
  description: z.string()
});

export type userTodoPostDTO = z.infer<typeof userTodoPostDTO>;
