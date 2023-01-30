import { Router } from "express";
import { TasksController } from "./controller/TasksController";

const routes = Router();

routes.get('/tasks', new TasksController().listTasks);
routes.post('/tasks', new TasksController().createTask);
routes.get('/tasks/:id', new TasksController().getTask);
routes.put('/tasks/:id', new TasksController().updateTask);
routes.delete('/tasks/:id', new TasksController().deleteTask);
routes.patch('/tasks/:id', new TasksController().finishedTask);

export default routes;