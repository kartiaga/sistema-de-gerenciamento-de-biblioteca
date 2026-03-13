import { NextResponse } from "next/server";
import { BookController } from "@/modules/books/book.controller";

const bookController = new BookController();

export async function POST(request: Request) {
  return bookController.create(request);
}

export async function GET() {
  return bookController.index();
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const idStr = searchParams.get("id");
  
  if (!idStr) {
    return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
  }

  const id = parseInt(idStr, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  return bookController.delete(id);
}