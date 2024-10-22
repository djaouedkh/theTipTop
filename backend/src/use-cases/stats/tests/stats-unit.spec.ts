// stats.service.spec.ts (unit tests)
import { Test, TestingModule } from '@nestjs/testing';
import { StatsService } from '../stats.service';
import { PrismaService } from '../../../../prisma/prisma.service';
import { AdvancedStatsDto } from '../dtos/advanced-stats.dto';
import { GlobalStatsDto } from '../dtos/global-stats.dto';
import { AgeGroup } from '../enums/age-group.enum';
import { Gender } from '../enums/gender.enum';

// Mock data
const mockGlobalStats: GlobalStatsDto = {
  totalTickets: 1000,
  ticketsPlayed: 800,
  ticketsNotPlayed: 200,
  totalParticipants: 500,
  claimedGains: 300,
  unclaimedGains: 200,
};

const mockAdvancedStats: AdvancedStatsDto = {
  globalStats: mockGlobalStats,
  participantsByGender: { male: 300, female: 200 },
  participantsByAgeGroup: {
    [AgeGroup.YoungAdult]: 150,
    [AgeGroup.Adult]: 100,
    [AgeGroup.MiddleAged]: 80,
    [AgeGroup.Senior]: 70,
    [AgeGroup.Elder]: 100,
  },
  gainsDistribution: {
    'Gain 1': 200,
    'Gain 2': 100,
  },
};

// Unit tests
describe('StatsService - Unit Tests', () => {
  let service: StatsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsService,
        {
          provide: PrismaService,
          useValue: {
            ticket: {
              count: jest.fn(),
              groupBy: jest.fn(),
            },
            user: {
              count: jest.fn(),
              groupBy: jest.fn(),
            },
            gain: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<StatsService>(StatsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return global stats', async () => {
    // Arrange
    jest.spyOn(prismaService.ticket, 'count').mockResolvedValueOnce(1000); // totalTickets
    jest.spyOn(prismaService.ticket, 'count').mockResolvedValueOnce(800); // ticketsPlayed
    jest.spyOn(prismaService.ticket, 'count').mockResolvedValueOnce(200); // ticketsNotPlayed
    jest.spyOn(service, 'getAllCountParticipants').mockResolvedValueOnce(500); // totalParticipants
    jest.spyOn(prismaService.ticket, 'count').mockResolvedValueOnce(300); // claimedGains
    jest.spyOn(prismaService.ticket, 'count').mockResolvedValueOnce(200); // unclaimedGains

    // Act
    const result = await service.getAllStats();

    // Assert
    expect(result).toEqual(mockGlobalStats);
  });

  it('should return advanced stats', async () => {
    // Arrange
    jest.spyOn(service, 'getAllStats').mockResolvedValueOnce(mockGlobalStats);
    jest.spyOn(service, 'getAllCountParticipantsByGender').mockResolvedValueOnce({ male: 300, female: 200 });
    jest.spyOn(service, 'getAllCountParticipantsByAgeGroup').mockResolvedValueOnce({
      [AgeGroup.YoungAdult]: 150,
      [AgeGroup.Adult]: 100,
      [AgeGroup.MiddleAged]: 80,
      [AgeGroup.Senior]: 70,
      [AgeGroup.Elder]: 100,
    });
    jest.spyOn(service, 'getAllCountGainsDistribution').mockResolvedValueOnce({
      'Gain 1': 200,
      'Gain 2': 100,
    });

    // Act
    const result = await service.getAllAdvancedStats();

    // Assert
    expect(result).toEqual(mockAdvancedStats);
  });

  it('should return participants by age group', async () => {
    // Arrange
    jest.spyOn(prismaService.user, 'count').mockResolvedValueOnce(150); // YoungAdult
    jest.spyOn(prismaService.user, 'count').mockResolvedValueOnce(100); // Adult
    jest.spyOn(prismaService.user, 'count').mockResolvedValueOnce(80); // MiddleAged
    jest.spyOn(prismaService.user, 'count').mockResolvedValueOnce(70); // Senior
    jest.spyOn(prismaService.user, 'count').mockResolvedValueOnce(100); // Elder

    // Act
    const result = await service.getAllCountParticipantsByAgeGroup();

    // Assert
    expect(result).toEqual({
      [AgeGroup.YoungAdult]: 150,
      [AgeGroup.Adult]: 100,
      [AgeGroup.MiddleAged]: 80,
      [AgeGroup.Senior]: 70,
      [AgeGroup.Elder]: 100,
    });
  });
});
