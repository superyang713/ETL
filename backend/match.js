import * as dynamoDbLib from "./libs/dynamodb-lib.js";
import { success, failure } from "./libs/response-lib.js";


export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "role = :role",
    ExpressionAttributeValues: {
      ":role": event.pathParameters.role,
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    if (result.Item) {
      return success(result.Item);      
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
