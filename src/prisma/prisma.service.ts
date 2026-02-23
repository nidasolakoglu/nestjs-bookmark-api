//Prisma Service ="Veritabanıyla konuşan sınıf"
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

// extends = üst sınıfın özelliklerini kullan
// super() = üst sınıfı başlat

@Injectable() //Yani Nest bunu kendi container’ında oluşturup başka yerlere verebilir.
export class PrismaService extends PrismaClient {
  //PrismaService, PrismaClient’ın sahip olduğu tüm özellikleri devralır.PrismaClient hazır bir db motoru
  //bunu yaparak prismaservice=Prsimacient ın nestjs formatına sokulmuş haline çeviriyoruz
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'), //.env gibi konfigürasyon değerlerine erişmek için. “Veritabanına bağlanırken kullanacağın URL şu olsun: DATABASE_URL”
         // url : env("DATABSE_URL")
        }
      }
    }); //super üst sınıfın constructorını çalıştırır yani prismaclientın
  }
}
