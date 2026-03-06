//bunu oluşturmak için terminale:
//
// "nest g module user" komutunu yazdık bize hem folderı hem bu file a classımızı  oluşturdu
//
//
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
