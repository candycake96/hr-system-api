import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionService {
	constructor(private readonly database: DatabaseService) {}

	async create(createPositionDto: CreatePositionDto) {
		return this.database.position.create({
			data: { ...createPositionDto, isActive: createPositionDto.isActive ?? true },
		});
	}

	async findAll() {
		return this.database.position.findMany({ orderBy: { createdAt: 'desc' } });
	}

	async findOne(id: string) {
		const position = await this.database.position.findUnique({ where: { id } });

		if (!position) {
			throw new NotFoundException(`Position with id ${id} not found`);
		}

		return position;
	}

	async update(id: string, updatePositionDto: UpdatePositionDto) {
		await this.findOne(id);

		return this.database.position.update({ where: { id }, data: updatePositionDto });
	}

	async remove(id: string) {
		await this.findOne(id);

		return this.database.position.delete({ where: { id } });
	}
}
