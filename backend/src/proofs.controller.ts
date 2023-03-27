import { CreateProofDTO } from './proofs.dto';
import { Proof } from './proofs.entity';
import {
  ProofAlreadyExistsException,
  ProofNotFoundException,
  ProofsService,
} from './proofs.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Controller('proofs')
export class ProofsController {
  constructor(private readonly proofService: ProofsService) {}

  @Get()
  @ApiQuery({ name: 'q', required: false })
  getProofs(@Query('q') query: string = ''): Promise<Proof[]> {
    return this.proofService.query(query);
  }

  @Get(':id')
  getOneProof(@Param('id') id: string): Promise<Proof> {
    return this.proofService.findOne(id);
  }

  @Post()
  async createProof(@Body() createProofDTO: CreateProofDTO): Promise<Proof> {
    try {
      const createdProof = await this.proofService.create(createProofDTO);
      return createdProof;
    } catch (error) {
      if (error instanceof ProofAlreadyExistsException) {
        throw new ConflictException(error.message);
      }
    }
  }

  @Delete(':id')
  async deleteProof(@Param('id') id: string): Promise<void> {
    try {
      await this.proofService.delete(id);
    } catch (error) {
      if (error instanceof ProofNotFoundException) {
        throw new NotFoundException(error.message);
      }
    }
  }
}
