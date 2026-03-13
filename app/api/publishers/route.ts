import { PublisherController } from "@/modules/publishers/publisher.controller";

const publisherController = new PublisherController();

export async function POST(request: Request) {
  return publisherController.create(request);
}

export async function GET() {
  return publisherController.index();
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id") || "");
  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: "ID inválido." }), { status: 400 });
  }
  return publisherController.delete(id);
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id") || "");
  if (isNaN(id)) {
    return new Response(JSON.stringify({ error: "ID inválido." }), { status: 400 });
  }
  return publisherController.update(request, id);
}

