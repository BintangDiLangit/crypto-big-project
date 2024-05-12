import { createUser, getAllUsers } from "@/lib/users";
import CryptoJS from "crypto-js";
import { randStr } from "@/lib/crypto";

export const GET = async () => {
  const users = await getAllUsers();
  if (!users) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(JSON.stringify(users), {
    status: 200,
  });
};

export const POST = async ({ request }: { request: Request }) => {
  const newUser = await request.json();

  newUser.keyUsername = randStr(16);
  newUser.keyPassword = randStr(16);

  newUser.username = CryptoJS.AES.encrypt(
    newUser.username,
    newUser.keyUsername
  ).toString();
  newUser.password = CryptoJS.AES.encrypt(
    newUser.password,
    newUser.keyPassword
  ).toString();

  // Decrypt
  // var bytes = CryptoJS.AES.decrypt(newUser.username, newUser.keyUsername);
  // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
  
  const user = await createUser(newUser);
  return new Response(JSON.stringify(user), {
    status: 200,
  });
};
