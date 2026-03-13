import { NextResponse } from "next/server";
import { BookService } from "./book.service";
import { CreateBookDTO } from "./dtos/create-book.dto";

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  async create(request: Request) {
    try {
      const { title, author, isbn, year, publisherId } = await request.json();

      const newBook = await this.bookService.createBook({
        title,
        author,
        isbn,
        publishYear: parseInt(year),
        publisherId: parseInt(publisherId),
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

  async index() {
    try {
      const books = await this.bookService.getAllBooks();
      return NextResponse.json({ books }, { status: 200 });
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      return NextResponse.json(
        { error: "Erro interno no servidor." },
        { status: 500 }
      );
    }
  }

  async delete(id: number) {
    try {
      const book = await this.bookService.deleteBook(id);
      return NextResponse.json({ message: "Livro excluído com sucesso!", book }, { status: 200 });
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
      return NextResponse.json(
        { error: "Erro interno no servidor." },
        { status: 500 }
      );
    }
  }

  async update(request: Request, id: number) {
    try {
      const { title, author, isbn, year, publisherId } = await request.json();
      const book = await this.bookService.updateBook(id, {
        title,
        author,
        isbn,
        publishYear: parseInt(year),
        publisherId: parseInt(publisherId),
      });
      return NextResponse.json({ message: "Livro atualizado com sucesso!", book }, { status: 200 });
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      return NextResponse.json(
        { error: "Erro interno no servidor." },
        { status: 500 }
      );
    }
  }
}
