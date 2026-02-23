//bunu oluşturmak için terminale:
//
// "nest g module user" komutunu yazdık bize hem folderı hem bu file a classımızı  oluşturdu
//
// 
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController]
})
export class UserModule {}
