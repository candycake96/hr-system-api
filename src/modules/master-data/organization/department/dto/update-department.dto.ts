import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateDepartmentDto {
	@IsString()
	@IsOptional()
	companyId?: string;

	@IsString()
	@IsOptional()
	branchId?: string;

	@IsString()
	@IsOptional()
	code?: string;

	@IsString()
	@IsOptional()
	nameTh?: string;

	@IsString()
	@IsOptional()
	nameEn?: string;

	@IsBoolean()
	@IsOptional()
	isActive?: boolean;
}
