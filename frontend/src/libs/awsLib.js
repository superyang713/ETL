import { Storage } from "aws-amplify";


export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.put(
    filename,
    file,
    {
      contentType: file.type
    });

  console.log("uploaded file: ", stored);

  return stored.key;
}
