import { IsString, IsOptional, IsBoolean, IsUrl, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;

  @IsOptional()
  @IsBoolean()
  receiveWeeklyEmail?: boolean;

  @IsOptional()
  @IsBoolean()
  receiveRecommendations?: boolean;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  oldPassword: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}
