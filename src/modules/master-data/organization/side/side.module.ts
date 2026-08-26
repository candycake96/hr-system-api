import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { SideController } from './side.controller';
import { SideService } from './side.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SideController],
  providers: [SideService],
})
export class SideModule {}
