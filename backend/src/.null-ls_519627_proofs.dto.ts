import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ProofType } from './proofs.types';

export class CreateProofDTO {
  @ApiProperty({ example: '1.1.1' })
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({
    example: ProofType.Definition.toString(),
    enum: ProofType,
    enumName: 'ProofType',
  })
  @IsNotEmpty()
  readonly type: ProofType;

  @ApiProperty({ example: 'Definition' })
  @ApiPropertyOptional()
  readonly title: string;

  @ApiProperty({ example: 'This happens' })
  @IsNotEmpty()
  readonly what: string;

  @ApiProperty({ example: 'Because of this' })
  @ApiPropertyOptional()
  readonly why: string;

  @ApiProperty({ example: 'LinearAlgebra' })
  readonly courseTag: string;
}

