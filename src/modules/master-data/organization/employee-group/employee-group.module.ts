import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { EmployeeGroupController } from './employee-group.controller';
import { EmployeeGroupService } from './employee-group.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeGroupController],
  providers: [EmployeeGroupService],
})
export class EmployeeGroupModule {}
