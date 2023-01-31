import { Request, Response } from "express";
import { userRepository } from "../repository/userRepository";

export class UsersController {
  async createUser(request: Request, response: Response) {
    const { name, email } = request.body;

    if (!name || !email) {
      return response.status(400).json({
        message: 'Campos obrigatórios não preenchidos!'
      });
    }

    try {
      const newUser = userRepository.create({
        name,
        email
      });

      await userRepository.save(newUser);

      return response.status(201).json(newUser);
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
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
      const users = await userRepository.findOneBy({ id: Number(id) });

      if (!users) {
        return response.status(404).json({
          message: 'Usuário não encontrado!'
        });
      }

      return response.json(users);
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

}