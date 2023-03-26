import { PrimaryColumn, Entity, Column } from 'typeorm';
import { CourseTag, ProofType } from './proofs.types';

@Entity()
export class Proof {
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'enum',
    enum: ProofType,
  })
  type: ProofType;

  @Column()
  title: string;

  @Column()
  what: string;

  @Column()
  why: string;

  @Column({
    type: 'enum',
    enum: CourseTag,
  })
  courseTag: string;
}

export { ProofType };

