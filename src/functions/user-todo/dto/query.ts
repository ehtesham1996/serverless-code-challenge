import { z } from 'zod';

export const userTodoQuery = z.object({
  userId: z.string()
});

export type userTodoQuery = z.infer<typeof userTodoQuery>;
