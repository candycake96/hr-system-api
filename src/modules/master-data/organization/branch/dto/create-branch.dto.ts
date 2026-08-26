import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBranchDto {
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
