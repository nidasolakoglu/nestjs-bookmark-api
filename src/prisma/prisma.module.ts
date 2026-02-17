//Prisma Module ="Bu servisi uygulamaya tanıtan yapı"

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //this prisma service will be avaiable to all the module in our app
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
