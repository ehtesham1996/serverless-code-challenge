import type { AwsFunctionHandler } from 'serverless/aws';
import { HTTP } from '../../../core/types/http-methods.enum';

export const userTodoDelete: AwsFunctionHandler = {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/user-todo-delete.handler`,
  events: [
    {
      httpApi: {
        method: HTTP.DELETE,
        path: '/user-todo/{todoId}'
      }
    }
  ]
};
