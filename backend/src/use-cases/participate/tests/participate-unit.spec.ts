// participate.service.spec.ts (unit tests)
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ContestService } from '../../../contests/contest.service';
import { ContestGetDto } from '../../../contests/dtos/contest-get.dto';
import { GainGetDto } from '../../../gains/dtos/gain-get.dto';
import { TicketGetDto } from '../../../tickets/dtos/ticket-get.dto';
import { TicketService } from '../../../tickets/ticket.service';
import { ParticipateService } from '../participate.service';
import 'reflect-metadata';

// Mock data for testing
const mockContest: ContestGetDto = {
  id: 1,
  name: 'Contest Name',
  startDate: new Date(),
  endDate: new Date(),
};

const mockTicket: TicketGetDto = {
  id: 1,
  code: 'TICKET123',
  isDelivered: false,
  contestId: 1,
  gainId: 2,
  userId: null,
  contest: mockContest,
  gain: { id: 2, name: 'Gain Name', desc: 'Description', price: 100, tickets: [] },
};

const mockGain: GainGetDto = {
  id: 2,
  name: 'Gain Name',
  desc: 'Description',
  price: 100,
  tickets: [],
};

describe('ParticipateService - Unit Tests', () => {
  let service: ParticipateService;
  let ticketService: TicketService;
  let contestService: ContestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipateService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: TicketService,
          useValue: {
            getByCriteria: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: ContestService,
          useValue: {
            isValid: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ParticipateService>(ParticipateService);
    ticketService = module.get<TicketService>(TicketService);
    contestService = module.get<ContestService>(ContestService);
  });

  // PLAY TO THE GAME METHOD
  it('should return isWinner false if ticket is not found', async () => {
    // Arrange
    jest.spyOn(ticketService, 'getByCriteria').mockResolvedValue(null);

    // Act
    const result = await service.playToTheGame('INVALID_CODE');

    // Assert
    expect(result.isWinner).toBe(false);
  });

  it('should return isWinner false if contest is not valid', async () => {
    // Arrange
    jest.spyOn(ticketService, 'getByCriteria').mockResolvedValue(mockTicket);
    jest.spyOn(contestService, 'isValid').mockResolvedValue(false);

    // Act
    const result = await service.playToTheGame('TICKET123');

    // Assert
    expect(result.isWinner).toBe(false);
  });

  it('should return PlayToTheGameDto with gain if ticket and contest are valid', async () => {
    // Arrange
    jest.spyOn(ticketService, 'getByCriteria').mockResolvedValue(mockTicket);
    jest.spyOn(contestService, 'isValid').mockResolvedValue(true);
    jest.spyOn(ticketService, 'update').mockResolvedValue({ ...mockTicket, userId: 1 });

    // Act
    const result = await service.playToTheGame('TICKET123');

    // Assert
    expect(result.isWinner).toBe(true);
    expect(result.gain).toEqual(expect.objectContaining({
      id: mockGain.id,
      name: mockGain.name,
      desc: mockGain.desc,
      price: mockGain.price,
    }));
  });
});
