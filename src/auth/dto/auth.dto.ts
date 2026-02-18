//Interface sadece şekil (structure) tanımlar.

import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

//Class hem;veri yapısını tanımlar ,hem de davranış (method) içerebilir
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
