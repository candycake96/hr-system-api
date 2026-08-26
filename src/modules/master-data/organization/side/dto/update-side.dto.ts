import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateSideDto {
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

	@IsBoolean()
	@IsOptional()
	isActive?: boolean;
}
