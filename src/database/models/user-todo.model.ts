import { TABLE_PREFIX } from '../configs/configs.database';

export const TodoTableName = `${TABLE_PREFIX}-data-table`;

export interface UserTodoDynamo {
  pk: string;
  sk: string;
  title: string;
  description: string;
}

export interface UserTodo extends Omit<UserTodoDynamo, 'pk' | 'sk'> {
  userId: string;
  todoId: string;
  date: string;
}
