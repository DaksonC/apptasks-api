import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { userRepository } from "../repository/userRepository";
import { taskRepository } from "../repository/taskRepository";

export class UsersController {
  async createUser(request: Request, response: Response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: 'Campos obrigatórios não preenchidos!'
      });
    }

    const userExists = await userRepository.findOneBy({ email });

    if (userExists) {
      return response.status(400).json({ message: 'Usuário já cadastrado!' });
    }

    try {
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = userRepository.create({
        name,
        email,
        password: hashPassword
      });

      await userRepository.save(newUser);

      const { password: _, ...user } = newUser;

      return response.status(201).json(user);
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return response.status(400).json({
        message: 'Usuário ou Senha não invalido!'
      });
    }

    try {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return response.status(400).json({
          message: 'Usuário ou Senha não invalido!'
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? '', {
        expiresIn: '5d'
      });

      const { password: _, ...userWithoutPassword } = user;

      return response.json({
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

  async getProfile(request: Request, response: Response) {
    return response.json(request.user);
  }

  async listUsers(request: Request, response: Response) {
    try {
      const users = await userRepository.find();

      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

  async getUser(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const user = await userRepository.findOneBy({ id: Number(id) });

      if (!user) {
        return response.status(404).json({
          message: 'Usuário não encontrado!'
        });
      }

      return response.json(user);
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

  async updateUser(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const user = await userRepository.update({ id: Number(id) }, request.body);

      if (user.affected === 1) {
        const userUpdated = await userRepository.findOneBy({ id: Number(id) });

        return response.json(userUpdated);
      }

      return response.status(404).json({
        message: 'Usuário não encontrado!'
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

  async deleteUser(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const user = await userRepository.delete({ id: Number(id) });

      if (user.affected === 1) {
        const userUpdated = await userRepository.findOneBy({ id: Number(id) });

        return response.json({ message: 'Usuário deletado com sucesso!' });
      }

      return response.status(404).json({
        message: 'Usuário não encontrado!'
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

  async userCreateTasks(request: Request, response: Response) {
    const { user_id } = request.params;
    const { task_id } = request.body;

    try {
      const user = await userRepository.findOneBy({ id: Number(user_id) });

      if (!user) {
        return response.status(404).json({
          message: 'Usuário não encontrado!'
        });
      }

      const task = await taskRepository.findOneBy({ id: Number(task_id) });

      if (!task) {
        return response.status(404).json({
          message: 'Tarefa não encontrada!'
        });
      }

      const userUpdatedTasks = {
        ...user,
        tasks: [task],
      }

      await userRepository.save(userUpdatedTasks);

      return response.status(200).json(user)
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

  async userList(request: Request, response: Response) {
    try {
      const user = await userRepository.find({
        relations: {
          tasks: true,
        }
      })

      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

}