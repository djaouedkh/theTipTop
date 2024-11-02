import { AgeGroupCount } from "./enums/age-group.enum";
import { Gender } from "./enums/gender.enum";
import { GlobalStatsDto } from "./global-stats.dto";

export type GenderCount = {
    [key in Gender]: number;
};

export class AdvancedStatsDto {
    globalStats: GlobalStatsDto;
    participantsByGender: GenderCount;
    participantsByAgeGroup: AgeGroupCount; // Ex: {'18-25': 500, '26-35': 300}
    gainsDistribution: { [gainName: string]: number }; // Clé dynamique pour chaque type de gain
}
