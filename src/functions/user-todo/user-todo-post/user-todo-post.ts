import {
  HttpErrorHandler,
  HttpJsonBodyParserMiddleware,
  ValidateBodyMiddleware
} from '@src/core/middlewares';
import { APIGatewayV2Handler } from '@src/core/types';
import { putItem } from '@src/database';
import { TodoTableName } from '@src/database/models/user-todo.model';
import { APIResponse } from '@src/services/response-service/response.service';
import { DynamoDB } from 'aws-sdk';
import middy from 'middy';
import { userTodoPostDTO } from './dto/user-todo-post.dto';

/**
 * @description A Lambda function to create a TODO records against a user in database
 * @param event - The event passed to the handler.
 * @returns ApiGatewayProxyResult - The result of the handler.
 */
const userTodoPost: APIGatewayV2Handler<userTodoPostDTO> = async ({ body }) => {
  const { userId, ...todoData } = body;
  const requestBody: DynamoDB.DocumentClient.PutItemInput = {
    TableName: TodoTableName,
    Item: {
      pk: userId,
      sk: `todo#${new Date().toISOString()}`,
      ...todoData
    }
  };

  await putItem(requestBody);

  return new APIResponse().created();
};

export const handler = middy(userTodoPost)
  .use(HttpErrorHandler())
  .use(HttpJsonBodyParserMiddleware())
  .use(ValidateBodyMiddleware(userTodoPostDTO));
