import { IsEnum, IsOptional, IsBoolean, IsIn } from 'class-validator';
import { AgeGroup } from '../../use-cases/stats/enums/age-group.enum';
import { Gender } from '../../use-cases/stats/enums/gender.enum';

export class UserFilterDto {

    @IsEnum(AgeGroup)
    @IsOptional()
    @IsIn([null, ...Object.values(AgeGroup)])  // Accepter null comme option 'Tout'
    ageGroup?: AgeGroup | null;

    @IsEnum(Gender)
    @IsOptional()
    @IsIn([null, ...Object.values(Gender)])    // Accepter null comme option 'Tout'
    gender?: Gender | null;

    @IsBoolean()
    @IsOptional()
    hasUnclaimedTickets?: boolean | null;

    @IsBoolean()
    @IsOptional()
    hasNeverParticipated?: boolean | null;
}
