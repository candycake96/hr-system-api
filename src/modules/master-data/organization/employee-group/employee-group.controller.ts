import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeGroupService } from './employee-group.service';
import { CreateEmployeeGroupDto } from './dto/create-employee-group.dto';
import { UpdateEmployeeGroupDto } from './dto/update-employee-group.dto';

@Controller('employee-group')
export class EmployeeGroupController {
	constructor(private readonly service: EmployeeGroupService) {}

	@Post()
	create(@Body() dto: CreateEmployeeGroupDto) {
		return this.service.create(dto);
	}

	@Get()
	findAll() {
		return this.service.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.service.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() dto: UpdateEmployeeGroupDto) {
		return this.service.update(id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.service.remove(id);
	}
}
