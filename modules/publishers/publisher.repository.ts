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
}
