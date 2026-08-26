import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SideService } from './side.service';
import { CreateSideDto } from './dto/create-side.dto';
import { UpdateSideDto } from './dto/update-side.dto';

@Controller('side')
export class SideController {
	constructor(private readonly sideService: SideService) {}

	@Post()
	create(@Body() createSideDto: CreateSideDto) {
		return this.sideService.create(createSideDto);
	}

	@Get()
	findAll() {
		return this.sideService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.sideService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateSideDto: UpdateSideDto) {
		return this.sideService.update(id, updateSideDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.sideService.remove(id);
	}
}
