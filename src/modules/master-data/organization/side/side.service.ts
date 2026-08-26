import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { CreateSideDto } from './dto/create-side.dto';
import { UpdateSideDto } from './dto/update-side.dto';

@Injectable()
export class SideService {
	constructor(private readonly database: DatabaseService) {}

	async create(createSideDto: CreateSideDto) {
		return this.database.side.create({ data: { ...createSideDto, isActive: createSideDto.isActive ?? true } });
	}

	async findAll() {
		return this.database.side.findMany({ orderBy: { createdAt: 'desc' } });
	}

	async findOne(id: string) {
		const side = await this.database.side.findUnique({ where: { id } });

		if (!side) {
			throw new NotFoundException(`Side with id ${id} not found`);
		}

		return side;
	}

	async update(id: string, updateSideDto: UpdateSideDto) {
		await this.findOne(id);

		return this.database.side.update({ where: { id }, data: updateSideDto });
	}

	async remove(id: string) {
		await this.findOne(id);

		return this.database.side.delete({ where: { id } });
	}
}
