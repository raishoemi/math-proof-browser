import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Proof } from './proofs.entity';

@Injectable()
export class ProofsService {
  constructor(
    @InjectRepository(Proof)
    private proofRepository: Repository<Proof>,
  ) {}

  async create(proof: Proof): Promise<Proof> {
    return await this.proofRepository.save(proof);
  }

  async query(query: string): Promise<Proof[]> {
    return await this.proofRepository.find({
      where: { title: Like(`%${query}%`) },
    });
  }

  async delete(id: string): Promise<void> {
    this.proofRepository.delete(id);
  }

  async findOne(id: string): Promise<Proof> {
    return await this.proofRepository.findOne({ where: { id } });
  }
}
