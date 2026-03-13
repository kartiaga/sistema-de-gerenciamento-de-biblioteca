import { prisma } from "@/lib/prisma";

export interface CreateBookDTO {
  title: string;
  author: string;
  isbn: string;
  publishYear: number;
}

export class BookRepository {
  async create(data: CreateBookDTO) {
    return await prisma.book.create({
      data,
    });
  }

  async findByIsbn(isbn: string) {
    return await prisma.book.findUnique({
      where: { isbn },
    });
  }
}
