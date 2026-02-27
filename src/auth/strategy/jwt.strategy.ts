//jwt doğrulama kısmı;istek gelir bearer token secret ile doğrulanır token içindeki sub ile db den user bulunur
//user bulunursa "bu isteği yapan kişi budur" diye NestJS'e geri verilir
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnauthorizedException } from '@nestjs/common'; //yetkisiz hatası:HTTP 401 döner

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    const secret =
      config.get<string>('JWT_SECRET');
    if (!secret)
      throw new Error('JWT_SECRET is not set');

    super({
      //al bu ayarlarla çalış
      jwtFromRequest:
        //Bearer = taşıyan kişi,Bu token’a sahip olan kullanıcıdır
        ExtractJwt.fromAuthHeaderAsBearerToken(), //JWT’nin nereden alınacağını söyler
      secretOrKey: secret, //JWT’nin imzasını doğrulamak için kullanılan gizli anahtar
    });
    //Authorization → header adı
    // Bearer → token tipi
    // TOKEN → gerçek JWT
  }
  //token doğrulandıktan sonra burası çalışır
  async validate(payload: {
    //JWT’nin içindeki data
    sub: number;
    email: string;
  }) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
    if (!user) {
      throw new UnauthorizedException(
        'User not found',
      );
    }
    //şifre hash'i dışarı sızdırmamak
    const { hash, ...result } = user; //destructuring yapılıyor yani yeni temiz bir obje oluşturuluyor->"user'dan hash'i çıkar kalanları bana ver"
    return user;
  }
} //JWT=HEADER.PAYLOAD.SIGNATURE
//payload=kullanıcı bilgileri
