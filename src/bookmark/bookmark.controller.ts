import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetCurrentUser } from 'src/auth/decorator';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetFieldOfCurrentUser } from 'src/auth/decorator';
import { UserField } from 'src/auth/decorator/user-field.enum';
import type { EditBookmarkDto } from './dto';

//bu decorator aşağıdaki tüm route'lara JwtGuard uygular.tüm bookmark işlemlerinden önce token kontrolü yapılır.
@UseGuards(JwtGuard)
//Bu controller'ın temel route'ını belirler
@Controller('bookmarks')
//Bookmark endpointlerini yöneten class'tır.HTTP isteklerini alır,gerekli parametreleri çıkartır ve service'e yollar.
export class BookmarkController {
  //constructor:Dependency injection ile BookmarkService'i bu controller'a enjekte eder.Böylece aşağıdaki methodlarda this.bookmarkService kullanabiliriz.
  constructor(
    //amacı:BookmarkService'yi controller içine enjecte etmek,bu satır hem bir property oluşturur.Class içinde this.bookmarkService olarak kullanabilir.
    private bookmarkService: BookmarkService,
  ) {}

  //Amaç:Yeni bookmark oluşturmak.
  @Post()
  //Controller tarafındaki create endpoint methodu.Kullanıcı id'sini ve body'den gelen dto'yu alıp service'e iletir.
  CreateBookmark(
    //Jwt doğrulamasından sonra request.user içine eklenen kullanıcı bilgisinden sadece id alanını alır.Bu id service'e gönderilir ki bookmark hangi kullanıcıya ait belli olsun.
    @GetFieldOfCurrentUser(UserField.ID)
    userId: number,

    //istek gövdesindeki JSON veriyi dto'ya bağlar.CreateBookmark içinde title,desc,link gibi alanlar beklenir.
    @Body() dto: CreateBookmarkDto,
  ) {
    //Bu satır service içindeki createBookmark(userId: number, dto:CreateBookmarkDto) fonksiyonunu çağırır.S
    //Bu fonksiyonda yapılacaklar
    //-userId ile bookmark'ın sahibini belirler
    //-dto.title,dto.description,dto.link gibi alanları alır
    //-prisma ile db'de kayıt açar
    //-duplicate link varsa P2002 yakalar ve exception atar
    return this.bookmarkService.createBookmark(
      userId,
      dto,
    );
  }

  //Amaç:Giriş yapan kullanıcıya ait tüm bookmarkları çekmek.
  @Get()
  getAllBookmarksForOneUser(
    //kullanıcı'nın id'si tokendan alınır böylece sadece o kullanıcıya ait bookmarklar getirilir.
    @GetFieldOfCurrentUser(UserField.ID)
    userId: number,
  ) {
    //Controller sadece veriyi alıp servise gönderir.
    //request.user içinden id alanını al
    //ve bunu userId parametresine ver
    return this.bookmarkService.getAllBookmarksForOneUser(
      userId,
    );
  }

  //Bu method GET/bookmarks/:id isteğini karşılar,Amaç:belirli bir bookmark'ı id'ye göre çekmek.
  //:id=url'deki bookmark id
  @Get(':id')
  getOneBookmarkById(
    @GetFieldOfCurrentUser(UserField.ID)
    userId: number,

    //@Param('id', ParseIntPipe): URL'deki id parametresini alır.Örn: /bookmarks/7 ise burada bookmarkId=7 olur.
    //ParseIntPipe ile string'den number'a çevrilir.
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getOneBookmarkById(
      userId,
      bookmarkId,
    );
  }

  //PATCH /bookmarks/:id isteğini karşılar,Amaç:belirli bir bookmark'ı güncellemektir
  @Patch(':id')
  editBookmarkById(
    //request.user.id alınır ve güncelleme isteğini hangi kullanıcı yapıyor bilgisi buradan gelir.
    @GetFieldOfCurrentUser(UserField.ID)
    userId: number,

    //url'deki bookmark id al ve number'a çevir
    @Param('id', ParseIntPipe) bookmarkId: number,

    //Request Body'deki güncelleme verisi alınır ve bu veri EditBookmarkDto tipindedir.
    @Body() dto: EditBookmarkDto,
  ) {
    //Servis içinde edit fonksiyonu çağırılır.Gerekli parametreleri verilir.
    //Servis önce bu bookmark bu kullanıcıya ait mi diye bakar kayıt varsa dto içindeki alanlarla update işlemi yapılır.
    return this.bookmarkService.editBookmarkById(
      userId,
      bookmarkId,
      dto,
    );
  }

  @Delete('id')
  deleteBookmarkById(
    //request.user.id alınır,silme işlemi yapan kullanıcının kim olduğu berirlenir
    @GetFieldOfCurrentUser(UserField.ID)
    userId: number,

    //URL'de silinecek oln bookmark id'si alınır ve number'a çevrilir
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(
      userId,
      bookmarkId,
    );
  }
}
