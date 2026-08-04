import bcrypt from "bcrypt";
import { UserSchema } from "@/schemas/user";
import { insertUser } from "@/repositories/user.repository";

export async function createUser(body: unknown) {
  const result = UserSchema.safeParse(body);
  if (!result.success) {
    throw new Error("Dados inválidos");
  }
  if(result.data.password !== result.data.confirmPassword) {
    throw new Error("As senhas não coincidem");
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 10);
  const user = await insertUser({ ...result.data, password: hashedPassword }); 
  return user;
}