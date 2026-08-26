import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeGroupDto {
	@IsString()
	@IsOptional()
	companyId?: string;

	@IsString()
	@IsOptional()
	code?: string;

	@IsString()
	@IsOptional()
	nameTh?: string;

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
