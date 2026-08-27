import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateEmployeeAddressDto {
  @IsString()
  @IsNotEmpty()
  address1!: string;

  @IsString()
  @IsOptional()
  address2?: string | null;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  state!: string;

  @IsString()
  @IsNotEmpty()
  postalCode!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;
}

export class CreateEmployeeDto {
  @IsUUID()
  companyId!: string;

  @IsUUID()
  branchId!: string;

  @IsUUID()
  departmentId!: string;

  @IsUUID()
  positionId!: string;

  @IsUUID()
  @IsOptional()
  sideId?: string | null;

  @IsString()
  @IsNotEmpty()
  employeeCode!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsOptional()
  nickname?: string | null;

  @IsEmail()
  @IsOptional()
  email?: string | null;

  @IsString()
  @IsOptional()
  phone?: string | null;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsUUID()
  @IsOptional()
  userId?: string | null;

  @IsUUID()
  @IsOptional()
  employeeGroupId?: string | null;

  @IsUUID()
  @IsOptional()
  jobTitleId?: string | null;

  @IsArray()
  @IsOptional()
  addresses?: CreateEmployeeAddressDto[];
}
