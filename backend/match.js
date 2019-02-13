import * as dynamoDbLib from "./libs/dynamodb-lib.js";
import { success, failure } from "./libs/response-lib.js";


export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "#profile = :role",
    ExpressionAttributeValues: {
      ":role": event.pathParameters.role,
    },
    ExpressionAttributeNames: {
      "#profile": "role",
    },
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    return success(result.Items);
  } catch (e) {
    console.log(e)
    return failure({ status: false });
  }
}
