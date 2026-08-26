import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchService {
	constructor(private readonly database: DatabaseService) {}

	async create(createBranchDto: CreateBranchDto) {
		return this.database.branch.create({
			data: {
				...createBranchDto,
				isActive: createBranchDto.isActive ?? true,
			},
		});
	}

	async findAll() {
		return this.database.branch.findMany({
			orderBy: { createdAt: 'desc' },
		});
	}

	async findOne(id: string) {
		const branch = await this.database.branch.findUnique({ where: { id } });

		if (!branch) {
			throw new NotFoundException(`Branch with id ${id} not found`);
		}

		return branch;
	}

	async update(id: string, updateBranchDto: UpdateBranchDto) {
		await this.findOne(id);

		return this.database.branch.update({ where: { id }, data: updateBranchDto });
	}

	async remove(id: string) {
		await this.findOne(id);

		return this.database.branch.delete({ where: { id } });
	}
}
