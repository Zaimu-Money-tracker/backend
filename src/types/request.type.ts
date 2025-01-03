import { JwtPayload } from "jsonwebtoken";

interface Type {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string;
    }
  }
}
