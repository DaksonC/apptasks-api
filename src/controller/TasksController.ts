import { Request, Response } from "express";
import { taskRepository } from "../repositories/taskRepository";

export class TasksController {
  async createTask(request: Request, response: Response) {
    const { title, description } = request.body;

    if (!title || !description) {
      return response.status(400).json({
        message: 'Campos obrigatórios não preenchidos!'
      });
    }

    try {
      const newTask = taskRepository.create({
        title,
        description
      });

      await taskRepository.save(newTask);

      return response.status(201).json(newTask);
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

  async listTasks(request: Request, response: Response) {
    try {
      const tasks = await taskRepository.find();

      return response.status(200).json(tasks);
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

  async getTask(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const tasks = await taskRepository.findOneBy({ id: Number(id) });

      if (!tasks) {
        return response.status(404).json({
          message: 'Tarefa não encontrada!'
        });
      }

      return response.json(tasks);
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

  async updateTask(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const task = await taskRepository.update({ id: Number(id) }, request.body);

      if (task.affected === 1) {
        const taskUpdated = await taskRepository.findOneBy({ id: Number(id) });

        return response.json(taskUpdated);
      }

      return response.status(404).json({
        message: 'Tarefa não encontrada!'
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

  async finishedTask(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const task = await taskRepository.update({ id: Number(id) }, { finished: true });

      if (task.affected === 1) {
        const taskUpdated = await taskRepository.findOneBy({ id: Number(id) });

        return response.json({ message: 'Tarefa finalizada com sucesso!' });
      }

      return response.status(404).json({
        message: 'Tarefa não encontrada!'
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

  async deleteTask(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const task = await taskRepository.delete({ id: Number(id) });

      if (task.affected === 1) {
        const taskUpdated = await taskRepository.findOneBy({ id: Number(id) });

        return response.json({ message: 'Tarefa deletada com sucesso!' });
      }

      return response.status(404).json({
        message: 'Tarefa não encontrada!'
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

}