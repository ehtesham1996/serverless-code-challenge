import type { AwsFunctionHandler } from 'serverless/aws';
import { HTTP } from '../../../core/types/http-methods.enum';

export const userTodoPut: AwsFunctionHandler = {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/user-todo-put.handler`,
  events: [
    {
      httpApi: {
        method: HTTP.PUT,
        path: '/user-todo/{todoId}'
      }
    }
  ]
};
