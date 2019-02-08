export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "yang-notes-app-uploads"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://djzrbn94al.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_f84l3cgnU",
    APP_CLIENT_ID: "3m81i83ldigqo6rl2egk4ogkl9",
    IDENTITY_POOL_ID: "us-east-1:5005f60f-11b4-4665-8395-83ba4cee4bd8",
  }
};
