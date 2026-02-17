import { Body, Controller, Post } from '@nestjs/common'; //Controllerın service'yi çağırıyor olması lazım.İnternetten bir istek alacak service'yi call edecek,service methodu çalıştırıp sonuç döndürdükten sonra controllera gönderecek.Bu da browserda görünecek.

import { AuthService } from './auth.service'; //Bu dosya AuthService sınıfını kullanacak.
@Controller('auth') //Buradaki "auth" URL prefixidir.Yani bu controller içindeki bütün endpointlerin başına /auth eklenir.
//Controller will handle the request!!!
export class AuthController {
  constructor(private authService: AuthService) {} //NestJs için sadece sınıfı ve çağırılacak servisi bildirmen yeterli kalan relationu tamamen kendisi kuruyor
  //NestJS bana bir AuthService oluştur ve bu sınıfa ver.
  //service'de kullanılan signup ve login fonksiyonları için endpointler yazmalıyız.

  @Post('signup') //baştaki auth prefixi için bu POST /auth/signup böyle olur alttaki de aynı şekilde.
  signup() {
    return this.authService.signup(); //"Bu controller’ın içindeki authService’e git ve signup fonksiyonunu çalıştır."+this =Bu sınıfın içindeki değişkenlere veya fonksiyonlara erişmek için kullanılır.
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }

  // Eğer biri POST /auth/signup isteği gönderirse
  // signup() fonksiyonunu çalıştır.
  // Frontend veya Postman:
  // POST http://localhost:3000/auth/signup
  // isteği gönderir.
  // NestJS:
  // URL'e bakar
  // Controller bulur
  // Methodu çağırır
  // Yani:
  // request → controller → method
}
