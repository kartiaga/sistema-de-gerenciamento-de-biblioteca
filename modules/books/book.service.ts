import { BookRepository } from "./book.repository";
import { CreateBookDTO } from "./dtos/create-book.dto";

export class BookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async createBook(data: CreateBookDTO) {
    if (!data.title || !data.author || !data.isbn || !data.publishYear || !data.publisherId) {
      throw new Error("INCOMPLETE_DATA");
    }

    if (isNaN(data.publishYear)) {
      throw new Error("INVALID_YEAR");
    }

    const existingBook = await this.bookRepository.findByIsbn(data.isbn);
    if (existingBook) {
      throw new Error("ISBN_ALREADY_EXISTS");
    }

    return await this.bookRepository.create(data);
  }

  async getAllBooks() {
    return await this.bookRepository.findAll();
  }

  async deleteBook(id: number) {
    return await this.bookRepository.delete(id);
  }
}
