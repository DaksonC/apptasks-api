import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repository/userRepository";
import jwt from 'jsonwebtoken';

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      message: 'Token não informado!'
    });
  }

  const token = authorization.split(' ')[1];

  const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as { id: number };

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    return response.status(404).json({
      message: 'Usuário não encontrado!'
    });
  }

  const { password: _, ...userWithoutPassword } = user;

  request.user = userWithoutPassword;

  next()
}