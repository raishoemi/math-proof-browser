const fs = require('fs');
const path = require('path');
import { CreateProofDTO, UpdateProofDTO } from './proofs.dto';
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
  Patch,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Controller('proofs')
export class ProofsController {
  constructor(private readonly proofService: ProofsService) {}

  @Get()
  @ApiQuery({ name: 'q', required: false })
  getProofs(@Query('q') query?: string): Promise<Proof[]> {
    return this.proofService.query(query);
  }

  @Get(':id')
  async getOneProof(@Param('id') id: string): Promise<Proof> {
    try {
      const proof = await this.proofService.findOne(id);
      return proof;
    } catch (error) {
      if (error instanceof ProofNotFoundException) {
        throw new NotFoundException(error.message);
      } else throw error;
    }
  }

  @Post()
  @ApiCreatedResponse({ type: CreateProofDTO })
  async createProof(@Body() createProofDTO: CreateProofDTO): Promise<Proof> {
    try {
      const createdProof = await this.proofService.create(createProofDTO);
      return createdProof;
    } catch (error) {
      if (error instanceof ProofAlreadyExistsException) {
        throw new ConflictException(error.message);
      } else throw error;
    }
  }

  @Patch(':id')
  @ApiOkResponse({ type: CreateProofDTO })
  async updateProof(
    @Param('id') id: string,
    @Body() updateProofDTO: UpdateProofDTO,
  ): Promise<Proof> {
    try {
      console.log('DTO: ', updateProofDTO);
      const updatedProof = await this.proofService.update(id, updateProofDTO);
      console.log('result: ', updatedProof);

      return updatedProof;
    } catch (error) {
      if (error instanceof ProofNotFoundException) {
        throw new NotFoundException(error.message);
      } else throw error;
    }
  }

  @Delete(':id')
  async deleteProof(@Param('id') id: string): Promise<void> {
    try {
      await this.proofService.delete(id);
    } catch (error) {
      if (error instanceof ProofNotFoundException) {
        throw new NotFoundException(error.message);
      } else throw error;
    }
  }

  @Post('backup')
  async createBackup(): Promise<void> {
    const allProofs = await this.proofService.query();
    const backup = JSON.stringify(allProofs);
    const backupPath = path.join(__dirname, '..', 'mysql.backup.json');
    if (!fs.existsSync(path.dirname(backupPath))) {
      fs.mkdirSync(path.dirname(backupPath));
    }
    fs.writeFileSync(backupPath, backup);
  }
}
