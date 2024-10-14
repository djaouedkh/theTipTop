export class AdvancedStatsDto {
    totalTickets: number;
    ticketsUsed: number;
    ticketsNotUsed: number;
    claimedGains: number;
    unclaimedGains: number;
    totalParticipants: number;
    participantsByGender: { male: number; female: number; other: number };
    participantsByAgeGroup: { [key: string]: number }; // Ex: {'18-25': 500, '26-35': 300}
    gainsDistribution: { [gainName: string]: number }; // Clé dynamique pour chaque type de gain
}
