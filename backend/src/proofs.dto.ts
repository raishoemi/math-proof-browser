import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { CourseTag, ProofType } from './proofs.types';

export class CreateProofDTO {
  @ApiProperty({ example: '1.1.1' })
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({
    example: ProofType.Definition.toString(),
    enum: ProofType,
    enumName: 'ProofType',
  })
  @IsEnum(ProofType)
  @IsNotEmpty()
  readonly type: ProofType;

  @ApiPropertyOptional({ example: 'Definition' })
  readonly title: string;

  @ApiProperty({ example: 'This happens' })
  @IsNotEmpty()
  readonly what: string;

  @ApiPropertyOptional({ example: 'Because of this' })
  readonly why: string;

  @ApiProperty({
    example: CourseTag.Calculus.toString(),
    enum: CourseTag,
    enumName: 'CourseTag',
  })
  @IsEnum(CourseTag)
  @IsNotEmpty()
  readonly courseTag: CourseTag;
}

export class UpdateProofDTO {
  @ApiPropertyOptional({
    example: ProofType.Definition.toString(),
    enum: ProofType,
    enumName: 'ProofType',
  })
  @IsEnum(ProofType)
  @IsOptional()
  readonly type?: ProofType;

  @ApiPropertyOptional({ example: 'Definition' })
  @IsOptional()
  readonly title?: string;

  @ApiPropertyOptional({ example: 'This happens' })
  @IsOptional()
  readonly what?: string;

  @ApiPropertyOptional({ example: 'Because of this' })
  @IsOptional()
  readonly why?: string;

  @ApiPropertyOptional({
    example: CourseTag.Calculus.toString(),
    enum: CourseTag,
    enumName: 'CourseTag',
  })
  @IsEnum(CourseTag)
  @IsOptional()
  readonly courseTag?: CourseTag;
}
