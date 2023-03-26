import { Proof } from './proofs.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProofsService } from './proofs.service';
import { ProofsController } from './proofs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Proof])],
  providers: [ProofsService],
  controllers: [ProofsController],
})
export class ProofsModule {}
