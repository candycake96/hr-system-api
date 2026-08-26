import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePositionDto {
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
