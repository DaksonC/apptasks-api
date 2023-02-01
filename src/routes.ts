import { Router } from "express";

import { UsersController } from "./controller/UsersController";
import { TasksController } from "./controller/TasksController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { DepartamentsController } from "./controller/DepartamentsController";

const routes = Router();

routes.post('/users', new UsersController().createUser);
routes.post('/login', new UsersController().login);
routes.get('/profile', authMiddleware, new UsersController().getProfile);
routes.get('/users', new UsersController().userList);
routes.post('/users/:user_id/tasks', new UsersController().userCreateTasks);
routes.post('/departaments/:user_id', new DepartamentsController().createDepartament);

// routes.get('/users', new UsersController().listUsers);
routes.get('/users/:id', new UsersController().getUser);
routes.put('/users/:id', new UsersController().updateUser);
routes.delete('/users/:id', new UsersController().deleteUser);


routes.get('/tasks', new TasksController().listTasks);
routes.post('/tasks', new TasksController().createTask);
routes.get('/tasks/:id', new TasksController().getTask);
routes.put('/tasks/:id', new TasksController().updateTask);
routes.delete('/tasks/:id', new TasksController().deleteTask);
routes.patch('/tasks/:id', new TasksController().finishedTask);


routes.get('/departaments', new DepartamentsController().listDepartaments);
routes.get('/departaments/:id', new DepartamentsController().getDepartament);
routes.put('/departaments/:id', new DepartamentsController().updateDepartament);
routes.delete('/departaments/:id', new DepartamentsController().deleteDepartament);

export default routes;