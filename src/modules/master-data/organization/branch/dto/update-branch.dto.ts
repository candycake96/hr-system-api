import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateBranchDto {
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
	phone?: string;

	@IsEmail()
	@IsOptional()
	email?: string;

	@IsString()
	@IsOptional()
	address?: string;

	@IsBoolean()
	@IsOptional()
	isActive?: boolean;
}
