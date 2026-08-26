import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PositionController],
  providers: [PositionService],
})
export class PositionModule {}
