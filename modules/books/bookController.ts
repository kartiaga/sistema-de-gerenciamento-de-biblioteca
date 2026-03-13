import { NextResponse } from "next/server";
import { BookService } from "./bookService";

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  async create(request: Request) {
    try {
      const { title, author, isbn, year } = await request.json();

      const newBook = await this.bookService.createBook({
        title,
        author,
        isbn,
        publishYear: parseInt(year),
      });

      return NextResponse.json(
        { message: "Livro adicionado com sucesso!", book: newBook },
        { status: 201 }
      );
    } catch (error: any) {
      if (error.message === "INCOMPLETE_DATA") {
        return NextResponse.json(
          { error: "Todos os campos são obrigatórios." },
          { status: 400 }
        );
      }
      
      if (error.message === "INVALID_YEAR") {
        return NextResponse.json(
          { error: "O ano de publicação é inválido." },
          { status: 400 }
        );
      }

      if (error.message === "ISBN_ALREADY_EXISTS") {
        return NextResponse.json(
          { error: "Um livro com este ISBN já está cadastrado." },
          { status: 409 }
        );
      }
      
      console.error("Erro ao adicionar livro:", error);
      return NextResponse.json(
        { error: "Erro interno no servidor." },
        { status: 500 }
      );
    }
  }
}
