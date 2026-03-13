import { PublisherRepository } from "./publisher.repository";
import { CreatePublisherDTO } from "./dtos/create-publisher.dto";

export class PublisherService {
  private publisherRepository: PublisherRepository;

  constructor() {
    this.publisherRepository = new PublisherRepository();
  }

  async createPublisher(data: CreatePublisherDTO) {
    if (!data.name || !data.address || !data.website || !data.email) {
      throw new Error("INCOMPLETE_DATA");
    }

    return await this.publisherRepository.create(data);
  }

  async getAllPublishers() {
    return await this.publisherRepository.findAll();
  }
}
