import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
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

  @ApiProperty({ example: 'Definition' })
  @ApiPropertyOptional()
  readonly title: string;

  @ApiProperty({ example: 'This happens' })
  @IsNotEmpty()
  readonly what: string;

  @ApiProperty({ example: 'Because of this' })
  @ApiPropertyOptional()
  readonly why: string;

  @ApiProperty({
    example: CourseTag.Calculus.toString(),
    enum: CourseTag,
    enumName: 'CourseTag',
  })
  @IsEnum(CourseTag)
  @IsNotEmpty()
  readonly courseTag: string;
}
