import {
  HttpErrorHandler,
  HttpJsonBodyParserMiddleware,
  ValidateBodyMiddleware,
  ValidatePathMiddleware
} from '@src/core/middlewares';
import { APIGatewayV2Handler } from '@src/core/types';
import { buildUpdateExpression, updateItem } from '@src/database';
import { TodoTableName } from '@src/database/models/user-todo.model';
import { APIResponse } from '@src/services/response-service/response.service';
import { DynamoDB } from 'aws-sdk';
import middy from 'middy';
import { userTodoPathParameter } from '../dto/path';
import { userTodoPutDTO } from './dto/user-todo-put.dto';

/**
 * @description A Lambda function to update a TODO records against a user in database
 * @param event - The event passed to the handler.
 * @returns ApiGatewayProxyResult - The result of the handler.
 */
const userTodoPut: APIGatewayV2Handler<userTodoPutDTO, null, userTodoPathParameter> = async ({
  body,
  pathParameters
}) => {
  const { userId, ...todoData } = body;
  const { todoId } = pathParameters;
  const requestBody: DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: TodoTableName,
    ...buildUpdateExpression(
      {
        pk: userId,
        sk: `todo#${new Date(+todoId).toISOString()}`
      },
      todoData
    )
  };

  await updateItem(requestBody);

  return new APIResponse().success('Saved');
};

export const handler = middy(userTodoPut)
  .use(HttpErrorHandler())
  .use(HttpJsonBodyParserMiddleware())
  .use(ValidatePathMiddleware(userTodoPathParameter))
  .use(ValidateBodyMiddleware(userTodoPutDTO));
