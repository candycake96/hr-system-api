import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
