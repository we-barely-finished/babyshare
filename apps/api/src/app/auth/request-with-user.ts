import { Request } from 'express';
import { JwtUserPayload } from './jwt-user-payload';

export interface RequestWithUser extends Request {
  user: JwtUserPayload;
}
