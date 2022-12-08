import type { AwsFunctionHandler } from 'serverless/aws';
import { HTTP } from '../../core/types/http-methods.enum';

export const pingPong: AwsFunctionHandler = {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/post.handler`,
  events: [
    {
      httpApi: {
        method: HTTP.GET,
        path: '/ping'
      }
    }
  ]
};
