import { Request, Response } from "express";
import { departamentRepository } from "../repository/departamentRepository";

export class DepartamentsController {
  async createDepartament(request: Request, response: Response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({
        message: 'Campos obrigatórios não preenchidos!'
      });
    }

    try {
      const newDepartament = departamentRepository.create({
        name
      });

      await departamentRepository.save(newDepartament);

      return response.status(201).json(newDepartament);
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

  async listDepartaments(request: Request, response: Response) {
    try {
      const departaments = await departamentRepository.find();

      return response.status(200).json(departaments);
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

  async getDepartament(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const departaments = await departamentRepository.findOneBy({ id: Number(id) });

      if (!departaments) {
        return response.status(404).json({
          message: 'Departamento não encontrado!'
        });
      }

      return response.json(departaments);
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

  async updateDepartament(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const departament = await departamentRepository.update({ id: Number(id) }, request.body);

      if (departament.affected === 1) {
        const departamentUpdated = await departamentRepository.findOneBy({ id: Number(id) });

        return response.json(departamentUpdated);
      }

      return response.status(404).json({
        message: 'Departamento não encontrado!'
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

  async deleteDepartament(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const departament = await departamentRepository.delete({ id: Number(id) });

      if (departament.affected === 1) {
        const departamentUpdated = await departamentRepository.findOneBy({ id: Number(id) });

        return response.json({ message: 'Departamento deletado com sucesso!' });
      }

      return response.status(404).json({
        message: 'Departamento não encontrado!'
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Erro interno do servidor!'
      });
    }
  }

}