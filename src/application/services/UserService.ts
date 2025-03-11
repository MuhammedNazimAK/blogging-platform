import { AppDataSource } from "../../config/database";
import { User } from "../../domain/entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userRepository = AppDataSource.getRepository(User);

export const signup = async (name: string, email: string, password: string) => {

  console.log('sign user mail', email);
  console.log('sign user pass', password);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = hashedPassword;

  return userRepository.save(user);
};


export const login = async (email: string, password: string) => {

  console.log('email of the user', email)
  console.log("passoword", password)

  const user = await userRepository.findOneBy({ email });

  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password!);

  console.log("password", isPasswordValid)

  if (!isPasswordValid) throw new Error("Invalid password");

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.jwt_SECTRET!,
    { expiresIn: "1h" }
  );

  console.log("user", user);

  return { user, token };
}

export const getProfile = async (userId: string) => {
  return userRepository.findOneBy({ id: userId });
};

