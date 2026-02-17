import { Module } from "@nestjs/common"; 
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule], //başka modülün içindeki servisleri kullanacak
    controllers:[AuthController], //bu modülün endpoint kapısı
    providers:[AuthService], //bu modülün iş yapan sınıfı
})
export class AuthModule {} //export yazmazsam sadece bu modulün içinde çalışacak bir class olur,diğer uygulamaların bunu kullanabilmesi için exportlamam lazım 
