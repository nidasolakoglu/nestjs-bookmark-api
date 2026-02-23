import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(config: ConfigService) {
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
  async validate(payload: any) {
    //JWT’nin içindeki data
    return {
      //Bunlar payload içindeki alanlar
      userId: payload.sub,
      email: payload.email,
    };
  }
}//JWT=HEADER.PAYLOAD.SIGNATURE
//payload=kullanıcı bilgileri 
