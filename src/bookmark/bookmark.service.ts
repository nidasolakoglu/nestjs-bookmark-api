import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ) {
    try {
    return await this.prisma.bookmark.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description,
        link: dto.link,
        isFavorite: dto.isFavorite ?? false,
        visitCount: dto.visitCount ?? 0,
      },
    });
  }catch (error) {
    if (
      error instanceof
        PrismaClientKnownRequestError &&
      error.code === 'P2002' //Bu hata Prisma'nın bildiği bir database hatası mı? && hata kodunu kontrol eder.
    ) {
      //ForbiddenException=var ama erişemezsin durumlarında kullanılır 
      throw new ForbiddenException(
        'This link is already in favs.',
      );
    }

    throw error;
  }
  }

  getAllBookmarksForOneUser(userId: number) {
    return this.prisma.bookmark.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  getOneBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    return this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    const bookmark =
      await this.prisma.bookmark.findFirst({
        where: {
          id: bookmarkId,
          userId,
        },
      });
    if (!bookmark) {
      throw new NotFoundException(
        'There is no bookmark which has this id.',
      );
    }

    return this.prisma.bookmark.update({
      where: { id: bookmarkId },
      data: dto,
    });
  }

  async deleteBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    const bookmark =
      await this.prisma.bookmark.findFirst({
        where: {
          id: bookmarkId,
          userId,
        },
      });

    if (!bookmark) {
      throw new NotFoundException(
        'There is no bookmark which has this id.',
      );
    }

    return this.prisma.bookmark.delete({
      where: { id: bookmarkId },
    });
  }
}
