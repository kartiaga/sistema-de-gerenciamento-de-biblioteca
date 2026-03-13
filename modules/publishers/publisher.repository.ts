import { prisma } from "@/lib/prisma";
import { CreatePublisherDTO } from "./dtos/create-publisher.dto";

export class PublisherRepository {
  async create(data: CreatePublisherDTO) {
    return prisma.publisher.create({
      data,
    });
  }

  async findAll() {
    return prisma.publisher.findMany({
      orderBy: { id: "desc" },
    });
  }

  async delete(id: number) {
    return prisma.publisher.delete({
      where: { id },
    });
  }

  async update(id: number, data: CreatePublisherDTO) {
    return prisma.publisher.update({
      where: { id },
      data,
    });
  }
}
