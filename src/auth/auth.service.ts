import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'; //Argon2:şifreyi hashler,düz şifre saklamayı engeller,login sırasında doğrulama yapar
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { hash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {} // NestJS bana PrismaService ver diyorsun ve NestJS senin yerine veriyor.buna Dependency Injection denir.

  async signup(dto: AuthDto) {
    // async=Fonksiyonun içinde await kullanabilmeni sağlar.
    //dto=controller'dan gelen veriyi temsil eder aynı dto yeniden oluşturulmaz sadece param. olarak aktarılır

    //GENERATE THE PASSWORD HASH.
    const hash = await argon.hash(dto.password); //argon2 hashleme işlemi anında bitmez,zaman alır bu yüzden asenkron çalışır
    //SAVE THE NEW USER ID IN THE DB.
    try {
      const user = await this.prisma.user.create({
        //user tablosuna yeni bir kayıt ekle;zaman alır,promise döndürür ve kayıt bitene kadar bekle ve sonucu al
        data: {
          email: dto.email,
          hash,
        },
        //   select: {
        //     id: true,
        //     email: true,
        //     createdAt: true,
        //   },
        //bu şekilde de tek fieldların görünmesini seçebiliriz ama useful değil çünkü çok fazla field olabilir
      }); // await: Promise döndüren bir işlemin (örneğin Promise<string>) promise'yi çözer içindeki gerçek değeri verir.
      // Promise içindeki gerçek değeri alır ve kodun devamını ondan sonra çalıştırır.

      delete (user as any).hash; //user nesnesinin içindeki hash alanını siler, yani response dönerken şifre hash’i dışarı gönderilmez.Yani DB’de hash hâlâ durur, sadece client’a gönderilmez.

      //RETURN THE SAVED USER
      return user;
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    //FIND THE USER BY EMAIL
    const user =
      await this.prisma.user.findUnique({
        // const → bu değişkeni bir kere atayacağım, sonra yeniden değer vermeyeceğim
        where: {
          // await → veritabanı sorgusu bitene kadar bekler ve sonucu alır
          email: dto.email,
        },
      });
    //IF USER DOES NOT EXIST THROW EXEPTION
    if (!user)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    //COMPARE PASSWORD
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    //IF PASSWORD INCORRECT THROW EXCEPTION
    if (!pwMatches)
      throw new ForbiddenException(
        'Credentials incorrect',
      );
    //SEND BACK THE USER
    delete (user as any).hash;
    return user;
  }
}
