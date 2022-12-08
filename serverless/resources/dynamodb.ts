export const DataTable = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    // eslint-disable-next-line no-template-curly-in-string
    TableName: '${sls:stage}-data-table',
    AttributeDefinitions: [
      {
        AttributeName: 'pk',
        AttributeType: 'S'
      },
      {
        AttributeName: 'sk',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'pk',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'sk',
        KeyType: 'RANGE'
      }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  }
};
