import type { Serverless } from 'serverless/aws';
import { DynamoDBTables } from './dynamodb';

export const resources: Serverless['resources'] = {
  Resources: {
    ...DynamoDBTables
  }
};
