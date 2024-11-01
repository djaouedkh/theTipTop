// lottery-game.service.spec.ts (test unitaire)
import { Test, TestingModule } from '@nestjs/testing';
import { LotteryGameService } from '../lottery-game.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { LotteryGameGetDto } from '../dtos/lottery-game-get.dto';
import { UserGetDto } from '../../users/dtos/user-get.dto';
import 'reflect-metadata';

describe('LotteryGame - Unitary Test', () => {
    let service: LotteryGameService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            LotteryGameService,
            {
            provide: PrismaService,
            useValue: {
                lotteryGame: {
                findFirst: jest.fn(),
                update: jest.fn(),
                },
                user: {
                findMany: jest.fn(),
                },
            },
            },
        ],
        }).compile();

        service = module.get<LotteryGameService>(LotteryGameService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

  // GET METHOD
  it('should return a LotteryGameGetDto when calling get()', async () => {
    // Arrange
    const mockLotteryGame: LotteryGameGetDto = {
      id: 1,
      name: 'Test Lottery Game',
      desc: 'A test lottery game',
      price: 100,
      userId: 1,
      user: {
        id: 1,
        email: 'test@example.com',
        firstname: 'Test',
        lastname: 'User',
      } as UserGetDto,
    };
    prismaService.lotteryGame.findFirst = jest.fn().mockResolvedValue(mockLotteryGame);

    // Act
    const result = await service.get();

    // Assert
    expect(result).toBeInstanceOf(LotteryGameGetDto);
    expect(result.id).toBe(mockLotteryGame.id);
  });

  // PLAY METHOD
  it('should throw an error if a winner has already been chosen when calling play()', async () => {
    // Arrange
    const mockLotteryGame: LotteryGameGetDto = {
      id: 1,
      name: 'Test Lottery Game',
      desc: 'A test lottery game',
      price: 100,
      userId: 1, // Winner already assigned
      user: {
        id: 1,
        email: 'test@example.com',
        firstname: 'Test',
        lastname: 'User',
      } as UserGetDto,
    };
    prismaService.lotteryGame.findFirst = jest.fn().mockResolvedValue(mockLotteryGame);

    // Act & Assert
    await expect(service.play()).rejects.toThrow('Un gagnant a déjà été tiré au sort.');
  });

  it('should throw an error if no participants are eligible when calling play()', async () => {
    // Arrange
    const mockLotteryGame: LotteryGameGetDto = {
      id: 1,
      name: 'Test Lottery Game',
      desc: 'A test lottery game',
      price: 100,
      userId: null,
      user: null,
    };
    prismaService.lotteryGame.findFirst = jest.fn().mockResolvedValue(mockLotteryGame);
    prismaService.user.findMany = jest.fn().mockResolvedValue([]); // No participants

    // Act & Assert
    await expect(service.play()).rejects.toThrow("Aucun participant n'est éligible.");
  });

  it('should update the lottery game with a winner when calling play()', async () => {
    // Arrange
    const mockLotteryGame: LotteryGameGetDto = {
      id: 1,
      name: 'Test Lottery Game',
      desc: 'A test lottery game',
      price: 100,
      userId: null,
      user: null,
    };
    const mockParticipants = [
      { id: 1, email: 'test1@example.com', firstname: 'Test1', lastname: 'User1' },
      { id: 2, email: 'test2@example.com', firstname: 'Test2', lastname: 'User2' },
    ];
    const mockUpdatedLotteryGame: LotteryGameGetDto = {
      ...mockLotteryGame,
      userId: 1,
      user: mockParticipants[0] as UserGetDto,
    };

    prismaService.lotteryGame.findFirst = jest.fn().mockResolvedValue(mockLotteryGame);
    prismaService.user.findMany = jest.fn().mockResolvedValue(mockParticipants);
    prismaService.lotteryGame.update = jest.fn().mockResolvedValue(mockUpdatedLotteryGame);

    // Act
    const result = await service.play();

    // Assert
    expect(result).toBeInstanceOf(LotteryGameGetDto);
    expect(result.userId).toBe(mockUpdatedLotteryGame.userId);
    expect(result.user.email).toBe(mockUpdatedLotteryGame.user.email);
  });
});
