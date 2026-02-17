import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {} // NestJS bana PrismaService ver diyorsun ve NestJS senin yerine veriyor.buna Dependency Injection denir.
    signup(){
        return { msg:'I have signed up!'}
    }
    
    signin(){
        return { msg:'I have signed in!'}

    }
}
