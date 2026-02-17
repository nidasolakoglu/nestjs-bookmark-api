//Prisma Service ="Veritabanıyla konuşan sınıf"
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// extends = üst sınıfın özelliklerini kullan
// super() = üst sınıfı başlat

@Injectable()
export class PrismaService extends PrismaClient {
  //PrismaService, PrismaClient’ın sahip olduğu tüm özellikleri devralır.PrismaClient hazır bir db motoru
  //bunu yaparak prismaservice=Prsimacient ın nestjs formatına sokulmuş haline çeviriyoruz
  constructor() {
    super({}); //super üst sınıfın constructorını çalıştırır yani prismaclientın
  }
}
