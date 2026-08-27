import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { CreateEmployeeRepository } from './repository/creact-employee.repository';
import { EmployeeRepository } from './repository/employee.repository';
import { UpdateEmployeeRepository } from './repository/update-employee.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    EmployeeRepository,
    CreateEmployeeRepository,
    UpdateEmployeeRepository,
  ],
})
export class EmployeeModule {}
