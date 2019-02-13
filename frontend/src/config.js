export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "etl-backend-version-2-dev-attachmentsbucket-gci05q6rhfnh"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://3bx2vs2gyh.execute-api.us-east-1.amazonaws.com/dev",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_tku58egZv",
    APP_CLIENT_ID: "14h9iumustpd7sgt7rfsndc682",
    IDENTITY_POOL_ID: "us-east-1:c2f32973-0eaf-4507-b8c9-bee4b056edad"
  }
};
