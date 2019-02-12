export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "etl-backend-version-1-dev-attachmentsbucket-1ttnzcon1xqtd"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://m7k80cnflh.execute-api.us-east-1.amazonaws.com/dev",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_fuMUL7nng",
    APP_CLIENT_ID: "1jk72p5bh1ah9cbi1029p1djvc",
    IDENTITY_POOL_ID: "us-east-1:69843ebb-7816-45a6-b022-0f8046ff798e"
  }
};
