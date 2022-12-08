import type { AwsFunctionHandler } from 'serverless/aws';
import { HTTP } from '../../../core/types/http-methods.enum';

export const userTodoGetById: AwsFunctionHandler = {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/user-todo-get-id.handler`,
  events: [
    {
      httpApi: {
        method: HTTP.GET,
        path: '/user-todo/{todoId}'
      }
    }
  ]
};
