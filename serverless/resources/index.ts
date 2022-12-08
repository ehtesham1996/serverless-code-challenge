import type { AWS } from '@serverless/typescript';
import { DataTable } from './dynamodb';
import { GatewayResponse } from './gateway-response';

export const resources: AWS['resources'] = {
  Resources: {
    GatewayResponse,
    DataTable
  }
};
