import { prisma } from "@/lib/prisma";
import { CreateBookDTO } from "./dtos/create-book.dto";

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

  async findAll() {
    return await prisma.book.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }
}
