import { CreateProofDTO } from './proofs.dto';
import { Proof } from './proofs.entity';
import { ProofsService } from './proofs.service';
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
  createProof(@Body() createProofDTO: CreateProofDTO): Promise<Proof> {
    return this.proofService.create(createProofDTO);
  }

  @Delete(':id')
  deleteProof(@Param('id') id: string): Promise<void> {
    return this.proofService.delete(id);
  }
}
