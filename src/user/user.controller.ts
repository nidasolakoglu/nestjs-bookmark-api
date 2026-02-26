import {
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator/';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard) //bu endpointe gelen herkes JWT göndermek zorunda AuthGuard('jwt'),JwtSTrategy tetikler ve devreye girer
@Controller('users')
export class UserController {
  //it wil catch ../users/me
  @Get('me')
  getMe(@GetUser() user: User) {
    return user; //isteği atan kullanıcıya geri döndür
  }

  @Patch()
  editUser() {}
} 
