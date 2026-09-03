import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './modules/master-data/organization/company/company.module';
import { DatabaseModule } from './database/database.module';
import { BranchModule } from './modules/master-data/organization/branch/branch.module';
import { SideModule } from './modules/master-data/organization/side/side.module';
import { DepartmentModule } from './modules/master-data/organization/department/department.module';
import { PositionModule } from './modules/master-data/organization/position/position.module';
import { EmployeeGroupModule } from './modules/master-data/organization/employee-group/employee-group.module';
import { EmployeeModule } from './modules/master-data/employee/employee.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    CompanyModule,
    DatabaseModule,
    BranchModule,
    SideModule,
    DepartmentModule,
    PositionModule,
    EmployeeGroupModule,
    EmployeeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
