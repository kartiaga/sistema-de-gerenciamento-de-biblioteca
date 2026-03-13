import { BookRepository, CreateBookDTO } from "./bookRepository";

export class BookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async createBook(data: CreateBookDTO) {
    if (!data.title || !data.author || !data.isbn || !data.publishYear) {
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
}
