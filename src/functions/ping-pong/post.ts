import { HttpErrorHandler } from '@src/core/middlewares';
import { APIResponse } from '@src/services/response-service/response.service';
import { APIGatewayProxyHandler } from 'aws-lambda';
import middy from 'middy';

/**
 * @description A simple handler to get response from server.
 * @param event - The event passed to the handler.
 * @returns ApiGatewayProxyResult - The result of the handler.
 */
const PingPong: APIGatewayProxyHandler = async (event) => {
  const { body } = event;
  return new APIResponse().success('Pong', { hello: 'world', body: body || 'empty' });
};

export const handler = middy(PingPong).use(HttpErrorHandler());
