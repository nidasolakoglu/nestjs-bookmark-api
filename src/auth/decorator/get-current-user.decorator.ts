import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const GetCurrentUser =
  createParamDecorator(
    (
      data: unknown,
      executionContext: ExecutionContext,
    ) => {
      console.log(
        'BANA BAKIN EXEC CONTEXTI BASICAM',
      );
      console.log(executionContext);
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
