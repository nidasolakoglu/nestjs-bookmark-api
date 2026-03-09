import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { AppModule } from 'src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from '../src/user/dto';
import { CreateBookmarkDto } from 'src/bookmark/dto';
import { EditBookmarkDto } from 'src/bookmark/dto';

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
    await app.init(); //app'i hazırlar nstjs içindeki her şeyi kurar ama dışarıdan erişemezsin
    await app.listen(3333); //app'i çalıştır -> server başlatır yani artık http://localhost:3333

    let prisma: PrismaService;
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    // Pactum'un request atacağı backend server adresini ayarlıyorum
    pactum.request.setBaseUrl(
      'http://localhost:3333',
    );
  });

  afterAll(() => {
    app.close();
  });
  //it.todo = “bu test daha yazılacak” işaretidir
  //it.todo('should pass');

  //describe = “Bu testlerin konusu şu” demek
  //Auth modülü ile ilgili testler burada olacak demek;signup endpointi test edeceğiz
  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'vlad@gmail.com',
      password: '123',
    };
    describe('Singup', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec() //bir bir request başlat
          .post('/auth/signup') //ve bu req post request olacak
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400);
      });
      it('Should signup', () => {
        //signup için fake user verisi hazırlıyorum("birisi bu bilgilerle singup yapmaya çalışsın")

        //API çağırıyorum ve bu endpointe POST request gönderiyorum.yani BE'ye gerçekten HTTP req atıyorum
        return pactum
          .spec()
          .post('/auth/signup') //body gönderiyoum yani req body bu oluyor
          .withBody(dto)
          .expectStatus(201); //beklenen sonucu söylüyorum 201=created
        //inspect() = HTTP request ve response'u terminalde gösterir
      });
    });

    describe('Signin', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .expectStatus(400);
      });
      it('Should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .inspect()
          .expectStatus(200) //200=ok
          .stores('userAt', 'access_token'); //server'fan gelen response içindeki access_token değerini al ve userAt adıyla sakla
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .inspect()
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Vladimir',
          email: 'vlad@codewithvlad.com',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .inspect()
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });

    describe('Bookmarks', () => {
      describe('Get empty bookmarks', () => {
        it('should get bookmarks', () => {
          return pactum
            .spec()
            .get('/bookmarks')
            .withHeaders({
              Authorization: 'Bearer $S{userAt}',
            })
            .expectStatus(200)
            .expectBody([]);
        });
      });

      describe('Create bookmark', () => {
        const dto: CreateBookmarkDto = {
          title: 'First Bookmark',
          link: 'https://www.youtube.com/watch?v=d6WC5n9G_sM',
        };

        it('should create bookmark', () => {
          return pactum
            .spec()
            .post('/bookmarks')
            .withHeaders({
              Authorization: 'Bearer $S{userAt}',
            })
            .withBody(dto)
            .expectStatus(201)
            .stores('bookmarkId', 'id');
        });
      });

      describe('Get bookmarks', () => {
        it('should get bookmarks', () => {
          return pactum
            .spec()
            .get('/bookmarks')
            .withHeaders({
              Authorization: 'Bearer $S{userAt}',
            })
            .expectStatus(200)
            .expectJsonLength(1);
        });
      });

      describe('Get bookmark by id', () => {
        it('should get bookmark by id', () => {
          return pactum
            .spec()
            .get('/bookmarks/{id}')
            .withPathParams(
              'id',
              '$S{bookmarkId}',
            )
            .withHeaders({
              Authorization: 'Bearer $S{userAt}',
            })
            .expectStatus(200)
            .expectJsonMatch({
              id: '$S{bookmarkId}',
            });
        });
      });

      describe('Edit bookmark by id', () => {
        const dto: EditBookmarkDto = {
          title:
            'Kubernetes Course - Full Beginners Tutorial (Containerize Your Apps!)',
          description:
            'Learn how to use Kubernetes in this complete course. Kubernetes makes it possible to containerize applications and simplifies app deployment to production.',
        };

        it('should edit bookmark', () => {
          return pactum
            .spec()
            .patch('/bookmarks/{id}')
            .withPathParams(
              'id',
              '$S{bookmarkId}',
            )
            .withHeaders({
              Authorization: 'Bearer $S{userAt}',
            })
            .withBody(dto)
            .expectStatus(200)
            .expectBodyContains(dto.title)
            .expectBodyContains(dto.description);
        });
      });

      describe('Delete bookmark by id', () => {
        it('should delete bookmark', () => {
          return pactum
            .spec()
            .delete('/bookmarks/{id}')
            .withPathParams(
              'id',
              '$S{bookmarkId}',
            )
            .withHeaders({
              Authorization: 'Bearer $S{userAt}',
            })
            .expectStatus(200);
        });

        it('should get empty bookmarks', () => {
          return pactum
            .spec()
            .get('/bookmarks')
            .withHeaders({
              Authorization: 'Bearer $S{userAt}',
            })
            .expectStatus(200)
            .expectJsonLength(0);
        });
      });
    });
  });
});
