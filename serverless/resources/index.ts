import type { Serverless } from 'serverless/aws';
import { DataTable } from './dynamodb';

export const resources: Serverless['resources'] = {
  Resources: {
    DataTable
  }
};
