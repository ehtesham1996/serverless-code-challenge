/* eslint-disable no-template-curly-in-string */
/* eslint-disable import/no-import-module-exports */
import type { Serverless } from 'serverless/aws';
import { functions } from './src/functions';
import { esbuild } from './serverless/configs/esbuild.custom';
import { cors, dynamodb, prune } from './serverless/configs';
import { resources } from './serverless/resources';

const region: any = "${opt:region, 'us-east-1'}";
const stage = "${opt:stage, 'dev'}";

export const service: Serverless = {
  service: 'serverless-todo-code-challenge',
  frameworkVersion: '3',
  package: {
    individually: true,
    patterns: ['!**/*.test.ts']
  },
  custom: {
    esbuild,
    prune,
    dynamodb
  },
  plugins: [
    'serverless-esbuild',
    'serverless-dynamodb-local',
    'serverless-prune-plugin',
    'serverless-dotenv-plugin',
    'serverless-deployment-bucket',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    stage,
    region,
    memorySize: 256,
    httpApi: {
      cors
    },
    deploymentBucket: {
      name: '${self:service}-deployments',
      maxPreviousDeploymentArtifacts: 3
    },
    environment: {
      ENV: '${self:provider.stage}',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      REGION: '${self:provider.region}',
      NODE_OPTIONS: '--enable-source-maps'
    }
  },
  functions,
  resources
};

module.exports = service;
