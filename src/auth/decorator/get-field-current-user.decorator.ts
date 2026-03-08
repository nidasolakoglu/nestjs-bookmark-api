import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserField } from './user-field.enum';

export const GetFieldOfCurrentUser =
  createParamDecorator<UserField>(
    (
      userField: UserField,
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

      if (!(userField in user)) {
        throw new BadRequestException(
          `Requested user field "${userField}" does not exist.`,
        );
      }

      return user[userField];
    },
  );
