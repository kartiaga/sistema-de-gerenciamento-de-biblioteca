import { BookController } from "@/modules/books/bookController";

const bookController = new BookController();

export async function POST(request: Request) {
  return bookController.create(request);
}

export async function GET() {
  return bookController.index();
}
