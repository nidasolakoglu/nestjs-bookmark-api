import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { ValidationPipe } from '@nestjs/common'; 

//bir test grubu tanımlıyorum; describe = testleri gruplayan başlık
describe('App e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    //testlerden önce 1 kere çalışır.app'i ayağa kaldırır,db bağlar,setup yapmak
    const moduleRef = //olş. test modülünün referansı service alır,app başlatırsın
      //test için mini Nestjs app oluştur
      await Test.createTestingModule({
        //gerçek app'deki tüm modülleri buraya yükle
        imports: [AppModule],
      }).compile(); //bu modülü çalışır hale getir(initialize et),DI çalışır,serviceler hazırlanır,nest ayağa kalkar

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        // forbidNonWhitelisted: true, ==DTO’da olmayan alan gelirse direkt hata verir.fazlalık varsa hata ver
        //                             ==true olursa; DTO’da tanımlı olmayan alanları otomatik siler.fazlalıkları siler diyebiliriz
        // forbidUnknownValues: true,  ==Tamamen beklenmeyen bir veri yapısı gelirse hata verir.garip data gelirse reddet
        // transform: true             ==true olursa;Gelen veriyi DTO tipine dönüştürür.
      }),
    );
    await app.init();
  });

  afterAll(() => {
    app.close();
  });
  //it.todo = “bu test daha yazılacak” işaretidir
  it.todo('should pass');
});
