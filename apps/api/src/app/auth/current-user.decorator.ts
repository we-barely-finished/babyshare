import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from './request-with-user';

export const CurrentUserPayload = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    return request.user;
  },
);
