import { HttpErrorHandler, ValidatePathMiddleware } from '@src/core/middlewares';
import { ValidateQueryMiddleware } from '@src/core/middlewares/validate-query.middleware';
import { APIGatewayV2Handler } from '@src/core/types';
import { deleteItem } from '@src/database';
import { TodoTableName } from '@src/database/models/user-todo.model';
import { APIResponse } from '@src/services/response-service/response.service';
import middy from 'middy';
import { userTodoQuery } from '../dto/query';
import { userTodoPathParameter } from '../dto/path';

/**
 * @description Lambda function to delete user todo from the system
 * @param event - The event passed to the handler.
 * @returns ApiGatewayProxyResult - The result of the handler.
 */
const userTodoDelete: APIGatewayV2Handler<string, userTodoQuery, userTodoPathParameter> = async (
  event
) => {
  const {
    queryStringParameters: { userId },
    pathParameters: { todoId }
  } = event;

  await deleteItem({
    TableName: TodoTableName,
    Key: {
      pk: userId,
      sk: `todo#${new Date(+todoId).toISOString()}`
    }
  });

  return new APIResponse().success('Deleted!');
};

export const handler = middy(userTodoDelete)
  .use(ValidateQueryMiddleware(userTodoQuery))
  .use(ValidatePathMiddleware(userTodoPathParameter))
  .use(HttpErrorHandler());
