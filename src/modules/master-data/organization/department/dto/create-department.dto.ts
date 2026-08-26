import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
	@IsString()
	@IsOptional()
	id?: string;

	@IsString()
	@IsNotEmpty()
	companyId!: string;

	@IsString()
	@IsNotEmpty()
	branchId!: string;

	@IsString()
	@IsNotEmpty()
	code!: string;

	@IsString()
	@IsNotEmpty()
	nameTh!: string;

	@IsString()
	@IsOptional()
	nameEn?: string;

	@IsBoolean()
	@IsOptional()
	isActive?: boolean;
}
