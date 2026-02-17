//bu diğer modülleri implement edeceğimiz ana modülün kendisi 

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [AuthModule, PrismaModule,UserModule,BookmarkModule],//authentication yapmak için tasarladığımız modülü implement ettik 

})
export class AppModule {}

