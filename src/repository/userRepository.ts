import { AppDataSource } from "../data-source";
import { Users } from "../entity/Users";

export const userRepository = AppDataSource.getRepository(Users);