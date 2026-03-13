import { PublisherController } from "@/modules/publishers/publisher.controller";

const publisherController = new PublisherController();

export async function POST(request: Request) {
  return publisherController.create(request);
}

export async function GET() {
  return publisherController.index();
}
