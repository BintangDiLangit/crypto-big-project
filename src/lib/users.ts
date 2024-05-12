// /src/lib/users.js
import { Users } from "@/lib/mongodb";

export const getAllUsers = async () => {
  const users = await (await Users()).find({}).toArray();
  return users;
};

export const createUser = async (newUser : any) => {
  const user = await (await Users()).insertOne(newUser);
  return user;
};
