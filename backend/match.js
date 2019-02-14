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
    const matched_user = randomChoice(result.Items);
    console.log(matched_user);
    return success(matched_user);
  } catch (e) {
    console.log(e)
    return failure({ status: false });
  }
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
