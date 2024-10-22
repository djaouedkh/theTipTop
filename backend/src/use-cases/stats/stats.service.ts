import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { GlobalStatsDto } from './dtos/global-stats.dto';
import { AdvancedStatsDto, GenderCount } from './dtos/advanced-stats.dto';
import { AgeGroup, AgeGroupCount } from './enums/age-group.enum';
import { Gender } from './enums/gender.enum';

@Injectable()
export class StatsService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async getAllStats(): Promise<GlobalStatsDto> {
        const totalTickets = await this.prisma.ticket.count();
        const ticketsPlayed = await this.prisma.ticket.count({ where: { userId: { not: null } } });
        const ticketsNotPlayed = await this.prisma.ticket.count({ where: { userId: null } });
        const totalParticipants = await this.getAllCountParticipants();
        const claimedGains = await this.prisma.ticket.count({ where: { isDelivered: true } });
        const unclaimedGains = await this.prisma.ticket.count({ where: { isDelivered: false } });
        
        return plainToInstance(GlobalStatsDto, {
            totalTickets,
            ticketsPlayed,
            ticketsNotPlayed,
            totalParticipants,
            claimedGains,
            unclaimedGains,
        });
    }

    async getAllAdvancedStats(): Promise<AdvancedStatsDto> {
        const globalStats = await this.getAllStats();
        const participantsByGender = await this.getAllCountParticipantsByGender();
        const participantsByAgeGroup = await this.getAllCountParticipantsByAgeGroup();
        const gainsDistribution = await this.getAllCountGainsDistribution();

        return plainToInstance(AdvancedStatsDto, {
            globalStats,
            participantsByGender,
            participantsByAgeGroup,
            gainsDistribution,
        });
    }

    async getAllCountParticipants(): Promise<number> {
        const userIdKey: keyof Prisma.TicketWhereInput = 'userId';
        const uniqueParticipantCount = await this.prisma.ticket.groupBy({
            by: [userIdKey],
            where: {
                userId: { not: null },
            },
            _count: {
                _all: true,
            },
        });
        return uniqueParticipantCount.length;
    }

    async getAllCountParticipantsByGender(gender?: Gender): Promise<GenderCount | number> {
        if (gender) {
            // Retourne le nombre de participants pour un genre spécifique
            return await this.prisma.user.count({
                where: { gender, tickets: { some: { userId: { not: null } } } }
            });
        } else {
            // Utilise groupBy pour récupérer les comptes par genre en une seule requête
            const genderCounts = await this.prisma.user.groupBy({
                by: ['gender'],
                where: {
                    tickets: { some: { userId: { not: null } } }
                },
                _count: {
                    gender: true,
                },
            });
    
            // Initialisation des résultats avec les genres disponibles
            const result: GenderCount = { male: 0, female: 0 };
            
            for (const entry of genderCounts) {
                if (entry.gender === Gender.Male) {
                    result.male = entry._count.gender;
                } else {
                    result.female = entry._count.gender;
                }
            }
            
            return result;
        }
    }
    

    async getAllCountParticipantsByAgeGroup(ageGroups: AgeGroup[] = [
        AgeGroup.YoungAdult,
        AgeGroup.Adult,
        AgeGroup.MiddleAged,
        AgeGroup.Senior,
        AgeGroup.Elder
    ]): Promise<Partial<AgeGroupCount>> {
        const ageGroupCounts: Partial<AgeGroupCount> = {};
    
        for (const group of ageGroups) {
            let ageRange;
            switch (group) {
                case AgeGroup.YoungAdult:
                    ageRange = { gte: 18, lte: 25 };
                    break;
                case AgeGroup.Adult:
                    ageRange = { gte: 26, lte: 35 };
                    break;
                case AgeGroup.MiddleAged:
                    ageRange = { gte: 36, lte: 45 };
                    break;
                case AgeGroup.Senior:
                    ageRange = { gte: 46, lte: 55 };
                    break;
                case AgeGroup.Elder:
                    ageRange = { gte: 56 };
                    break;
            }
    
            if (ageRange) {
                const count = await this.prisma.user.count({
                    where: {
                        age: ageRange,
                        tickets: { some: { userId: { not: null } } }, // participants ayant un ticket
                    },
                });
                ageGroupCounts[group] = count;
            }
        }
        return ageGroupCounts;
    }
    
    async getAllCountGainsDistribution(): Promise<AdvancedStatsDto['gainsDistribution']> {
        const gainsDistribution = await this.prisma.ticket.groupBy({
            by: ['gainId'],
            _count: {
                gainId: true,
            },
        });

        const gainIds = gainsDistribution.map(g => g.gainId);
        const gains = await this.prisma.gain.findMany({
            where: { id: { in: gainIds } },
        });

        const formattedGainsDistribution = gainsDistribution.reduce((acc, current) => {
            const gainName = gains.find(gain => gain.id === current.gainId)?.name || `Gain ${current.gainId}`;
            acc[gainName] = current._count.gainId;
            return acc;
        }, {} as { [gainName: string]: number });

        return formattedGainsDistribution;
    }
}
