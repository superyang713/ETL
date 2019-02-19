import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      gender: data.gender,
      profilePic: data.profilePic,
      createdAt: Date.now(),
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e)
    return failure({ status: false });
  }
}
