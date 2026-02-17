import { NestFactory } from '@nestjs/core'; // Nest JS uygulamayı başlatıyor.--------------------
import { AppModule } from './app.module';
// bunlar başka dosyalardan şeyleri içeri almak demek,tek dosyayda her şeyi çağırmıyoruz gerekli parçaları çağırıyoruz

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Nest uygulamasını başlat ve AppModule(bu uygulamanın ana modülü) kullan.
  await app.listen(process.env.PORT ?? 3333); // Eğer ortamda bir PORT verilmişse onu kullan yoksa 3333 kullan
}
bootstrap();
