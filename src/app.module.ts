//bu diğer modülleri implement edeceğimiz ana modülün kendisi
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //Uygulama başlarken .env dosyasını yükle ve ConfigService’i tüm uygulamada kullanılabilir yap.
    AuthModule,
    PrismaModule,
    UserModule,
    BookmarkModule,
  ], //authentication yapmak için tasarladığımız modülü implement ettik
})
export class AppModule {}
