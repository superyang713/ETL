import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    Key: {
      role: event.pathParameters.role,
      userId: event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    console.log(event.pathParameters);
    const result = await dynamoDbLib.call("get", params);
    if (result.Item) {
      return success(result.Item);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
