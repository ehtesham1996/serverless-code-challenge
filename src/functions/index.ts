import type { AWS } from '@serverless/typescript';
import { pingPong } from './ping-pong';

export const functions: AWS['functions'] = {
  pingPong
};
