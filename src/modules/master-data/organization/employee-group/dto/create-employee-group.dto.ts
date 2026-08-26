import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeGroupDto {
	@IsString()
	@IsOptional()
	id?: string;

	@IsString()
	@IsNotEmpty()
	companyId!: string;

	@IsString()
	@IsNotEmpty()
	code!: string;

	@IsString()
	@IsNotEmpty()
	nameTh!: string;

	@IsString()
	@IsOptional()
	nameEn?: string;

	@IsString()
	@IsOptional()
	description?: string;

	@IsBoolean()
	@IsOptional()
	isActive?: boolean;
}
