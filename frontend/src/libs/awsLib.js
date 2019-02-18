import { Storage, API, Auth } from "aws-amplify";
import defaultPic from "assets/img/faces/marc.jpg";


export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(
    filename,
    file,
    {
      contentType: file.type,
      level: "public"
    });

  return stored.key;
}

export async function getCurrentUserInfo() {
  const userInfo = await Auth.currentUserInfo();
  const user = await API.get("ETL", `/profile/${userInfo.attributes.profile}`);
  return user;
}

export function getProfilePicFromS3(profilePic) {
  return profilePic ? Storage.vault.get(profilePic, {level: "public"}) : defaultPic;
}

export function createUser(user) {
  return API.post("ETL", "/register", {body: user});
}
