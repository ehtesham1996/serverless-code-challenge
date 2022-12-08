import type { AWS } from '@serverless/typescript';
import { HTTP } from '../../core/types/http-methods.enum';

export const pingPong: AWS['functions']['pingPong'] = {
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