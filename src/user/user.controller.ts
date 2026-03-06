import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { User } from '@prisma/client';
import { Request } from 'express';
import { GetCurrentUser } from 'src/auth/decorator/';
import { GetFieldOfCurrentUser } from 'src/auth/decorator/';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { EditUserDto } from './dto';
import { UserField } from 'src/auth/decorator/user-field.enum';

@UseGuards(JwtGuard) //bu endpointe gelen herkes JWT göndermek zorunda AuthGuard('jwt'),JwtSTrategy tetikler ve devreye girer
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  //it wil catch ../users/me
  @Get('me')
  getMe(@GetCurrentUser() user: User) {
    return user; //isteği atan kullanıcıya geri döndür
  }

  @Patch()
  editUser(
    @GetFieldOfCurrentUser(UserField.ID) userId: number,
    @Body() dto: EditUserDto,
  ) {
    console.log(userId);
    return this.userService.editUser(userId, dto);
  }
}
