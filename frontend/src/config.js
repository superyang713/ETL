export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "etl-backend-dev-attachmentsbucket-15pkn873qyxga"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://amfzb9p885.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_NhB3wfcmJ",
    APP_CLIENT_ID: "7dl4iinuk0rk4i2smsuhk11krs",
    IDENTITY_POOL_ID: "us-east-1:c06729d1-8b40-4da8-bc33-ac701734bab9",
  }
};
