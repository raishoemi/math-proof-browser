import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProofDTO, UpdateProofDTO } from './proofs.dto';
import { Proof } from './proofs.entity';

@Injectable()
export class ProofsService {
  constructor(
    @InjectRepository(Proof)
    private proofRepository: Repository<Proof>,
  ) {}

  async create(proof: CreateProofDTO): Promise<Proof> {
    // if proof with same id already exists, throw error
    const existingProof = await this.proofRepository.findOne({
      where: { id: proof.id },
    });
    if (existingProof) throw new ProofAlreadyExistsException(proof.id);

    return this.proofRepository.save(proof);
  }

  async update(id: string, proof: UpdateProofDTO): Promise<Proof> {
    const existingProof = await this.proofRepository.findOne({ where: { id } });
    if (!existingProof) throw new ProofNotFoundException(id);

    return this.proofRepository.save({ ...existingProof, ...proof });
  }

  async query(query: string): Promise<Proof[]> {
    return this.proofRepository.find({
      where: { title: Like(`%${query}%`) },
    });
  }

  async delete(id: string): Promise<void> {
    const result = await this.proofRepository.delete(id);
    if (result.affected === 0) throw new ProofNotFoundException(id);
  }

  async findOne(id: string): Promise<Proof> {
    return this.proofRepository.findOne({ where: { id } });
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
