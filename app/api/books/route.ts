import { BookController } from "@/modules/books/book.controller";

const bookController = new BookController();

export async function POST(request: Request) {
  return bookController.create(request);
}

export async function GET() {
  return bookController.index();
}
