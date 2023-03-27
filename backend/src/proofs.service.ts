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
    if (proof.id) {
      const existing = await this.proofRepository.findOne({
        where: { id: proof.id },
      });
      if (existing) throw new ProofAlreadyExistsException(proof.id);
    }
    return await this.proofRepository.save(proof);
  }

  async query(query: string): Promise<Proof[]> {
    return await this.proofRepository.find({
      where: { title: Like(`%${query}%`) },
    });
  }

  async delete(id: string): Promise<void> {
    const result = await this.proofRepository.delete(id);
    if (result.affected === 0) throw new ProofNotFoundException(id);
  }

  async findOne(id: string): Promise<Proof> {
    return await this.proofRepository.findOne({ where: { id } });
  }
}

export class ProofNotFoundException extends Error {
  constructor(id: string) {
    super(`Proof with id ${id} not found`);
  }
}

export class ProofAlreadyExistsException extends Error {
  constructor(id: string) {
    super(`Proof with id ${id} already exists`);
  }
}
