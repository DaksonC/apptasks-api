import { AppDataSource } from "../data-source";
import { Tasks } from "../entity/Tasks";

export const taskRepository = AppDataSource.getRepository(Tasks);