import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './modules/master-data/organization/company/company.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CompanyModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
