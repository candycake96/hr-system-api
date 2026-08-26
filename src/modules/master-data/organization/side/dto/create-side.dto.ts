import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSideDto {
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

	@IsBoolean()
	@IsOptional()
	isActive?: boolean;
}
