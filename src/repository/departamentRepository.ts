import { AppDataSource } from "../data-source";
import { Departaments } from "../entity/Departaments";

export const departamentRepository = AppDataSource.getRepository(Departaments);