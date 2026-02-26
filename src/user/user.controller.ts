import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
  //it wil catch ../users/me
  @UseGuards(AuthGuard('jwt')) //bu endpointe gelen herkes JWT göndermek zorunda AuthGuard('jwt'),JwtSTrategy tetikler ve devreye girer
  @Get('me')
  getMe(@Req() req: Request & { user?: any }) {
         return 'user info';
  }
}
 