import { Users } from '../entity/Users';

declare global {
  namespace Express {
    export interface Request {
      user: Partial<Users>;
    }
  }
}