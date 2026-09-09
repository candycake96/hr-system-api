import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsUUID()
  userId!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  currentPassword!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  newPassword!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  confirmPassword!: string;
}
