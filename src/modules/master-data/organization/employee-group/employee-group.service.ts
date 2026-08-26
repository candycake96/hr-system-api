import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { CreateEmployeeGroupDto } from './dto/create-employee-group.dto';
import { UpdateEmployeeGroupDto } from './dto/update-employee-group.dto';

@Injectable()
export class EmployeeGroupService {
	constructor(private readonly database: DatabaseService) {}

	async create(createDto: CreateEmployeeGroupDto) {
		return this.database.employeeGroup.create({ data: { ...createDto, isActive: createDto.isActive ?? true } });
	}

	async findAll() {
		return this.database.employeeGroup.findMany({ orderBy: { createdAt: 'desc' } });
	}

	async findOne(id: string) {
		const eg = await this.database.employeeGroup.findUnique({ where: { id } });

		if (!eg) throw new NotFoundException(`EmployeeGroup with id ${id} not found`);

		return eg;
	}

	async update(id: string, updateDto: UpdateEmployeeGroupDto) {
		await this.findOne(id);
		return this.database.employeeGroup.update({ where: { id }, data: updateDto });
	}

	async remove(id: string) {
		await this.findOne(id);
		return this.database.employeeGroup.delete({ where: { id } });
	}
}
