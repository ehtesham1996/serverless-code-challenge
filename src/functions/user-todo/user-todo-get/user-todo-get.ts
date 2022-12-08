import { HttpErrorHandler } from '@src/core/middlewares';
import { ValidateQueryMiddleware } from '@src/core/middlewares/validate-query.middleware';
import { APIGatewayV2Handler } from '@src/core/types';
import { queryItem } from '@src/database';
import { TodoTableName, UserTodo, UserTodoDynamo } from '@src/database/models/user-todo.model';
import { APIResponse } from '@src/services/response-service/response.service';
import middy from 'middy';
import { userTodoQuery } from '../dto/query';

/**
 * @description Lambda function to get all user todos from system
 * @param event - The event passed to the handler.
 * @returns ApiGatewayProxyResult - The result of the handler.
 */
const userTodoGet: APIGatewayV2Handler<string, userTodoQuery> = async (event) => {
  const {
    queryStringParameters: { userId }
  } = event;

  const data = await queryItem<UserTodoDynamo>({
    TableName: TodoTableName,
    KeyConditionExpression: ' pk = :userId AND begins_with(sk, :todo)',
    ExpressionAttributeValues: {
      ':userId': userId,
      ':todo': 'todo#'
    },
    ScanIndexForward: false
  });

  const todoItems: UserTodo[] =
    data.Items?.map((item) => {
      const { pk, sk, ...todoData } = item;
      return {
        userId: pk,
        todoId: new Date(sk.split('#')[1]).getTime().toString(),
        ...todoData,
        date: sk.split('#')[1]
      };
    }) || [];

  return new APIResponse().success('Fetched Data', todoItems);
};

export const handler = middy(userTodoGet)
  .use(ValidateQueryMiddleware(userTodoQuery))
  .use(HttpErrorHandler());
