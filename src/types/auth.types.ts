import { JwtPayload } from "jsonwebtoken";

export interface IUserInfoRequest extends Request {
  user: string|JwtPayload
}