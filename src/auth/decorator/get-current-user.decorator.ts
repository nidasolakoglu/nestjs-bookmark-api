import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const GetCurrentUser =
  createParamDecorator(
    (
      executionContext: ExecutionContext,
    ) => {
      const request = executionContext
        .switchToHttp()
        .getRequest();
      const user = request.user;

      if (!user) {
        throw new UnauthorizedException(
          'Current user was not found in request.',
        );
      } 
       return user;
    },
  );
