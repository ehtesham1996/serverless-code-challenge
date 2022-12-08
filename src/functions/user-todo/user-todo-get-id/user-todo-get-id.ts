import { HttpErrorHandler, ValidatePathMiddleware } from '@src/core/middlewares';
import { ValidateQueryMiddleware } from '@src/core/middlewares/validate-query.middleware';
import { APIGatewayV2Handler } from '@src/core/types';
import { getItem } from '@src/database';
import { TodoTableName, UserTodo, UserTodoDynamo } from '@src/database/models/user-todo.model';
import { APIResponse } from '@src/services/response-service/response.service';
import middy from 'middy';
import { userTodoQuery } from '../dto/query';
import { userTodoPathParameter } from '../dto/path';

/**
 * @description Lambda function to get todo by id
 * @param event - The event passed to the handler.
 * @returns ApiGatewayProxyResult - The result of the handler.
 */
const userTodoGetById: APIGatewayV2Handler<string, userTodoQuery, userTodoPathParameter> = async (
  event
) => {
  const {
    queryStringParameters: { userId },
    pathParameters: { todoId }
  } = event;

  const data = await getItem<UserTodoDynamo>({
    TableName: TodoTableName,
    Key: {
      pk: userId,
      sk: `todo#${new Date(+todoId).toISOString()}`
    }
  });

  const { pk, sk, ...todoData } = data;
  const todoItem: UserTodo = {
    userId: pk,
    todoId: new Date(sk.split('#')[1]).getTime().toString(),
    ...todoData,
    date: sk.split('#')[1]
  };

  return new APIResponse().success('Fetched Data', todoItem);
};

export const handler = middy(userTodoGetById)
  .use(ValidateQueryMiddleware(userTodoQuery))
  .use(ValidatePathMiddleware(userTodoPathParameter))
  .use(HttpErrorHandler());
