import { NextResponse } from "next/server";
import { PublisherService } from "./publisher.service";

export class PublisherController {
  private publisherService: PublisherService;

  constructor() {
    this.publisherService = new PublisherService();
  }

  async create(request: Request) {
    try {
      const { name, address, website, email } = await request.json();

      const newPublisher = await this.publisherService.createPublisher({
        name,
        address,
        website,
        email,
      });

      return NextResponse.json(
        { message: "Editora adicionada com sucesso!", publisher: newPublisher },
        { status: 201 }
      );
    } catch (error: any) {
      if (error.message === "INCOMPLETE_DATA") {
        return NextResponse.json(
          { error: "Todos os campos são obrigatórios." },
          { status: 400 }
        );
      }
      
      console.error("Erro ao adicionar editora:", error);
      return NextResponse.json(
        { error: "Erro interno no servidor." },
        { status: 500 }
      );
    }
  }

  async index() {
    try {
      const publishers = await this.publisherService.getAllPublishers();
      return NextResponse.json({ publishers }, { status: 200 });
    } catch (error) {
      console.error("Erro ao buscar editoras:", error);
      return NextResponse.json(
        { error: "Erro interno no servidor." },
        { status: 500 }
      );
    }
  }
}
