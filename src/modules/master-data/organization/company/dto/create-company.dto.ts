import { IsString, IsNotEmpty, IsOptional, IsEmail, IsUrl } from 'class-validator';

export class CreateCompanyDto {

  @IsString()
  @IsOptional() 
  id?: string;

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
  taxId?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsUrl()
  @IsOptional()
  website?: string;

}
