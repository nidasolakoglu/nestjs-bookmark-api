import { NestFactory } from '@nestjs/core'; // Nest JS uygulamayı başlatıyor.--------------------
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// bunlar başka dosyalardan şeyleri içeri almak demek,tek dosyayda her şeyi çağırmıyoruz gerekli parçaları çağırıyoruz

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Nest uygulamasını başlat ve AppModule(bu uygulamanın ana modülü) kullan.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true,
      // forbidNonWhitelisted: true, ==DTO’da olmayan alan gelirse direkt hata verir.fazlalık varsa hata ver
      //                             ==true olursa; DTO’da tanımlı olmayan alanları otomatik siler.fazlalıkları siler diyebiliriz
      // forbidUnknownValues: true,  ==Tamamen beklenmeyen bir veri yapısı gelirse hata verir.garip data gelirse reddet
      // transform: true             ==true olursa;Gelen veriyi DTO tipine dönüştürür.
    }),
  ); //Uygulamaya gelen tüm isteklerde, DTO’lara göre otomatik validation (doğrulama) yapılmasını sağlar.
  await app.listen(process.env.PORT ?? 3333); // Eğer ortamda bir PORT verilmişse onu kullan yoksa 3333 kullan
}
bootstrap();
