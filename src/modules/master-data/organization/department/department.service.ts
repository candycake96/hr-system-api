import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
	constructor(private readonly database: DatabaseService) {}

	async create(createDepartmentDto: CreateDepartmentDto) {
		return this.database.department.create({
			data: {
				...createDepartmentDto,
				isActive: createDepartmentDto.isActive ?? true,
			},
		});
	}

	async findAll() {
		return this.database.department.findMany({ orderBy: { createdAt: 'desc' } });
	}

	async findOne(id: string) {
		const department = await this.database.department.findUnique({ where: { id } });

		if (!department) {
			throw new NotFoundException(`Department with id ${id} not found`);
		}

		return department;
	}

	async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
		await this.findOne(id);

		return this.database.department.update({ where: { id }, data: updateDepartmentDto });
	}

	async remove(id: string) {
		await this.findOne(id);

		return this.database.department.delete({ where: { id } });
	}
}
