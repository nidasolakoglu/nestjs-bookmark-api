import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})], //başka modülün içindeki servisleri kullanacak + .register jwt ayarları yapmak için kullanılabiliyor
  controllers: [AuthController], //bu modülün endpoint kapısı
  providers: [AuthService, JwtStrategy], //bu modülün iş yapan sınıfı
})
export class AuthModule {} //export yazmazsam sadece bu modulün içinde çalışacak bir class olur,diğer uygulamaların bunu kullanabilmesi için exportlamam lazım


//Bir service’i constructor’da kullanabilmen için:
// 1️ Ya aynı module içinde providers'da olmalı
// 2️ Ya da başka bir module tarafından export edilip senin module’ünde import edilmiş olmalı
