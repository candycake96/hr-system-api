import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreateEmployeeAddressDto } from './creact-employee.dto';

export class UpdateEmployeeDto {
  @IsUUID()
  @IsOptional()
  companyId?: string;

  @IsUUID()
  @IsOptional()
  branchId?: string;

  @IsUUID()
  @IsOptional()
  departmentId?: string;

  @IsUUID()
  @IsOptional()
  positionId?: string;

  @IsUUID()
  @IsOptional()
  sideId?: string | null;

  @IsString()
  @IsOptional()
  employeeCode?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

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

  /** Omit to keep existing addresses; send [] to remove every address. */
  @IsArray()
  @IsOptional()
  addresses?: CreateEmployeeAddressDto[];
}
